# Simple room booker

## How to run

From backend:

```
npm run dev
```

From frontend:

```
npm run ios
```

### Why the VALID_SLOTS arrays?

We assume that each time slot always is one hour - to save time.

### Why authentication?

In a real world example, you wouldn't want just anyone to be able to book meeting rooms for example, see veryifyToken-middleware.
Also, this give us the "freedom" to save the authenticated user on the booking - so we would never need the user to input their name. For now, we only save the userId.

### Why a separate view per room? The figma showed all available bookings inside the same view.

Most of the time, a office could have over 12 meeting rooms. The booking view would be too messy.
