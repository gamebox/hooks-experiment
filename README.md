# Kanban Clone using React Hooks

This is an experiment of using React Hooks exclusively to create a clone of a kanban board application similar to Trello.  The hope is to understand how to best utilize hooks to create clean, maintainable components in an application of moderate complexity.

## Summary

The UI presented here is a sort of Trello / basic kanban clone.  The user is presented with three columns where they can add "cards" that respresent tasks that need to be completed.  The task is represented with a title and a description, and there is an avatar of the user who is assigned the task.

## User Interface

These cards can be moved from column to column as the status of the task changes over time.  It can also be moved within a column to indicate its relative priority against other tasks in that same column.

The cards can also be edited at any time with a double-click.  One downside of this is that there is no real affordance offered to designate it, and therefore may have trouble with discoverability.  I justify this decision by making an assumption that a double-click is a common action a user will try to accomplish a task.  I only make this assumption due to time constraints.  Ideally, more time could be allotted to designing a proper affordance that stays out of the user's way until it is needed.

## Technical Decisions

I decided to put most of the core business logic into a separate module.  This was done to improve testability of this most important part of the source.  I added mostly happy-path testing for this module.  In a more complete implementation, I would check more edge cases.

Instead of bringing in a formal dependency for MD5 generation(needed for Gravatar url), I copy and pasted in an implementation and lightly modified it for my purposes.

In order to implement synched state across tabs through local storage, I created a new hook that utilizes two very useful hooks from https://usehooks.com.  This allowed the top-level state to look like a normal `useState` use, with the synching logic being abstracted away.

As far as overall state management, the scale of this app allowed me to just use simple state located in the `Board` component, and the appropriate callbacks being passed down explicitly to children.  This is done tidily using higher-order functions. All components have very little business logic in them, with `Card` being a notable exception in handling local state around edit state.  This could easily have been moved up with the rest of the state, but I decided to keep it at this level in order to keep the top-level state object simple - and to put off a rewrite in a time-sensitive project in order to refactor.

## Tests performed

Many of the tests that I preformed can be found in the tests in the cypress/integration directory.  In short, I tested that all of the requirements listed in the project README were satisfied.

- Card can be created in any column
- Card can be edited
- Card can be dragged between columns
- Card can be dragged within column to a new position
- State is synched between tabs
- State is persisted through a refresh

Also, as stated before most of the business logic is tested via unit tests found in utilities/board.test.js

## Possible Further Refinements

I would definitely like to improve the UI around dragging the cards.  For instance, I would like for the card being dragged left in the source column to appear in some sort of empty state so the user knows that the card will no longer be there.  It would also be nice if some sort of similar placeholder appeared in the destination column at the index where the card will be inserted.

The last thing I would like to work on is improving the mechanics of the "Cancel" affordance in the CardEditForm component so that cancelling a new card would delete it.