# 🛍️ E-Commerce App (React Native + Expo + Redux Toolkit + RTK Query)

Een moderne mobiele e-commerce app gebouwd met **React Native (Expo)**,  
**Redux Toolkit**, **RTK Query**, **FlashList** en de **DummyJSON Products API**.

De app toont een realistische e-commerce flow met producten, zoeken, filters, sorteren, favorieten, winkelwagen en light/dark theme.

---

## 🚀 Features

### 📦 Producten

- Producten laden via **RTK Query** met caching
- Productlijst met **FlashList**
- Zoeken met debounce
- Filteren op categorie (DummyJSON categories)
- Sorteren:
    - Naam (A–Z)
    - Prijs oplopend
    - Prijs aflopend
- Favorieten (wishlist) met hartje
- Productdetails in een modal (aparte API call per product)

### 🛒 Winkelwagen

- Product toevoegen vanuit de productdetails
- Hoeveelheid aanpassen via **+ / –** knoppen
- Individueel product verwijderen
- Volledige winkelwagen leegmaken (Clear cart)
- Totaal aantal items en totale prijs via memoized selectors
- Cart Summary Bar bovenaan de lijst met:
    - aantal items
    - totaalprijs
    - knop om cart modal te openen
- Cart Modal met:
    - lijst van items
    - quantity per item
    - totaal
    - “Close” knop (ook als cart leeg is)

### 🎨 Light/Dark Theme

- Theme state in Redux (`ui.theme`: `"light"` of `"dark"`)
- ThemeToggle component om te switchen
- Theme toegepast op:
    - hoofdscherm (ProductsScreen)
    - ProductDetailsModal
    - CartModal

---

## ✔️ Opdrachtvereisten

| Vereiste                                   | Status |
|-------------------------------------------|--------|
| useState                                  | ✔️ |
| useEffect                                 | ✔️ |
| useMemo                                   | ✔️ |
| useCallback                               | ✔️ |
| Minimaal 2 Redux Toolkit slices           | ✔️ 3 slices |
| Async actions (API calls)                 | ✔️ via RTK Query |
| Minstens 3 memoized selectors             | ✔️ |
| FlashList                                 | ✔️ |
| Loading states                            | ✔️ |
| Error handling + retry                    | ✔️ |
| Pull-to-refresh                           | ✔️ |
| Filters (min. 2)                          | ✔️ categorie + sort |
| Zoeken met debounce                       | ✔️ |
| Favorieten/wishlist                       | ✔️ |
| Winkelwagen                               | ✔️ |
| Theme toggle                              | ✔️ |
| Moderne UI                                | ✔️ |

---

## 📁 Projectstructuur

```
src/
├── api/
│   └── products-api.ts
├── components/
│   ├── product-card.tsx
│   ├── product-details-modal.tsx
│   ├── category-filter.tsx
│   ├── search-bar.tsx
│   ├── sort-bar.tsx
│   ├── cart-summary-bar.tsx
│   ├── cart-modal.tsx
│   └── theme-toggle.tsx
├── screens/
│   └── products-screen.tsx
├── selectors/
│   ├── ui-selectors.ts
│   ├── favorites-selectors.ts
│   └── cart-selectors.ts
├── slices/
│   ├── ui-slice.ts
│   ├── cart-slice.ts
│   └── favorites-slice.ts
└── store/
    └── index.ts
```

---

## 🧠 Architectuur

### Redux Toolkit & RTK Query

- **Store** geconfigureerd in `src/store/index.ts`
- **RTK Query** beheert API requests, caching en loading states
- **Slices** scheiden UI-state, cart-logic en favorites

### Slices

#### `ui-slice.ts`
- search
- category
- sort
- theme

#### `cart-slice.ts`
- items[]
- addToCart
- increaseQuantity
- decreaseQuantity
- removeFromCart
- clearCart

#### `favorites-slice.ts`
- toggleFavorite(productId)

---

## 🔍 Memoized Selectors

Voorbeeld:

```ts
export const selectCartTotalPrice = createSelector(
  selectCartItems,
  (items) => items.reduce((sum, item) => sum + item.price * item.quantity, 0)
);
```

---

## 🧮 Sorting met useMemo

```ts
const sortedProducts = useMemo(() => {
  if (!data) return [];

  const list = [...data.products];

  switch (sort) {
    case "priceAsc":
      return list.sort((a, b) => a.price - b.price);
    case "priceDesc":
      return list.sort((a, b) => b.price - a.price);
    default:
      return list.sort((a, b) => a.title.localeCompare(b.title));
  }
}, [data, sort]);
```

---

## 🎨 Theming

- `theme: "light" | "dark"`
- Wordt toegepast in ProductsScreen, CartModal & Details Modal

---

## 🛠️ Installatie & Gebruik

```bash
npm install
npx expo start / npm run start
```

---


