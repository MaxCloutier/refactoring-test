# refactoring-test

## Project setup

```
yarn
```

### Run tests

```
yarn run test
```

## Assignment

### Git history

- [Test file](https://github.com/MaxCloutier/refactoring-test/commits/master/test/gilded-rose.spec.ts)
- [updateQuality Method](https://github.com/MaxCloutier/refactoring-test/commits/master/app/gilded-rose.ts)

### Thought Process

- I started by writting tests based on the Gilded Rose Requirements.
- After the tests were written and I felt like they were strong enough to encapsulate what the current behaviors were, I started improving the updateQuality Method.
- To begin I looked at the "quick wins" I could get away with without refactoring the logic right away.
- After each change I ran the tests to make sure I could catch any failing test early.
- After the quick wins, I looked into repetition. I aimed to remove as much duplicated code as possible again running tests after each change.
- Finally took on the logic to boil it down to two things:
  - sellIn will always only be substracted by one.
  - The new quality value depends on the type of item and sellIn value, but only need to be changed once.
- After establishing that I set to create a switch to isolate item types and in each cases I reassigned how the quality would be affected based on the sellIn value.
- Ran the tests to make sure that it still worked.
- Finally I added the handling of the Conjured items which was missing from the legacy method.
- Ran the tests one last time to make sure that everything worked properly.

### Future improvements?

Maybe it would be a good idea to give some good quality food to the goblin in the corner to soften him up before asking if he would consider adding a category to items so we can refer to them by category instead of a name in the code. That way, we wouldn't need to change the code if we want to add a product with the same rules but a different name to the products list.
