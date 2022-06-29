const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = 0;
  const MAX_PARTITION_KEY_LENGTH = 256;
  let candidate;

  if (!event) {
    candidate = TRIVIAL_PARTITION_KEY;
  } else if (event.partitionKey) {
    candidate = event.partitionKey;
  } else {
    const data = JSON.stringify(event);
    candidate = crypto.createHash("sha3-512").update(data).digest("hex");
  }

  candidate = typeof candidate !== "string" ? JSON.stringify(candidate) : candidate; 

  if (candidate.length > MAX_PARTITION_KEY_LENGTH) {
    candidate = crypto.createHash("sha3-512").update(candidate).digest("hex");
  }
  return candidate;
};