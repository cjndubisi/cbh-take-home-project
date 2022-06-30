const crypto = require("crypto");

/* 
Rewiew of current code:
- By looking at it there are nested of `if` conditions, t
  here should be a way to combine them as much as possible
- I can see duplication of `crypto.createHash("sha3-512").update(data).digest("hex");` 
  would try to have it as a single statement


Refactor: 
- Modified TRIVIAL_PARTITION_KEY value to a number value as it would be stringified regardless to access .length
- Removed nested if statments
- TRIVIAL_PARTITION_KEY would always be set to candidate if event when event is falsy
- Use tenary operator for single line `if`
- initialize candidate with an intital value 
- Use a base case for an early exit

It more readable beause I can easly track the condidtional blocks
 */
exports.deterministicPartitionKeyOld = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (event) {
    if (event.partitionKey) {
      candidate = event.partitionKey;
    } else {
      const data = JSON.stringify(event);
      candidate = crypto.createHash("sha3-512").update(data).digest("hex");
    }
  }

  if (candidate) {
    if (typeof candidate !== "string") {
      candidate = JSON.stringify(candidate);
    }
  } else {
    candidate = TRIVIAL_PARTITION_KEY;
  }
  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = 0;
  const MAX_PARTITION_KEY_LENGTH = 256;
  const eventWithPartitionKey = event && event.partitionKey;

  let candidate = (eventWithPartitionKey) ? event.partitionKey : TRIVIAL_PARTITION_KEY;
  
  if (event && !event.partitionKey) {
    const data = JSON.stringify(event);
    return crypto.createHash("sha3-512").update(data).digest("hex");
  }

  candidate = typeof candidate !== "string" ? JSON.stringify(candidate) : candidate; 

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};