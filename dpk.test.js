const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("Return the literal 0 when given the number 0", () => {
    const trivialKey = deterministicPartitionKey(0);
    expect(trivialKey).toBe("0");

  })

  it("Return a hex candidate when given the string literal '0'", () => {
    const trivialKey = deterministicPartitionKey("0");
    expect(trivialKey.length).toBe(128);

  })

  it("Return a hex candidate when given the number 1", () => {
    const trivialKey = deterministicPartitionKey(1);
    expect(trivialKey.length).toBe(128);
  })

  it("Return the partitionKey ('323') input when pariticationKey length is less than MAX_PARTITION_KEY_LENGTH ", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: "323"
    });
    expect(trivialKey).toBe("323");
  })

  it("Return a hex candidate when given an empty Object", () => {
    const trivialKey = deterministicPartitionKey({});
    expect(trivialKey.length).toBe(128);
  })

  it("Return a stringified version of partitionKey when partitionKey is less than MAX_PARTITION_KEY_LENGTH", () => {
    const trivialKey = deterministicPartitionKey({
      partitionKey: 83
    });
    expect(trivialKey).toBe("83");
  })

  it("Return a hex candidate when partitionKey is larger than MAX_PARTITION_KEY_LENGTH", () => {
    const longKey = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    const trivialKey = deterministicPartitionKey({
      partitionKey: longKey
    });
    expect(trivialKey.length).toBe(128);
  })

  it("Return a hex candidate when partitionKey is larger than MAX_PARTITION_KEY_LENGTH", () => {
    const longEvent = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
    const trivialKey = deterministicPartitionKey(longEvent);
    expect(trivialKey.length).toBe(128);
  })

});
