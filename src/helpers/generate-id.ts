function* generateId(): Generator<number> {
  let i = 0;
  while (true) {
    yield (i += 1);
  }
}

export default generateId;
