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

### Why the hardcoded values like the two 'VALID_SLOTS' arrays or the "DAYS_AHEAD"?

To save time we hardcoded these values. Each time slot is assumed to be one hour, and the booking window is a fixed number of days ahead.

### Why authentication?

In a real world example, you wouldn't want just anyone to be able to book meeting rooms for example, see verifyToken-middleware.
Also, this give us the "freedom" to save the authenticated user on the booking - so we would never need the user to input their name. For now, we only save the userId.

### Why a separate view per room? The figma showed all available bookings inside the same view.

Most of the time, an office could have over 12 meeting rooms. The booking view would be too messy.
