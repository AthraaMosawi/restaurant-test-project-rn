# React Native Test Project: Restaurant Menu App

## Project Overview
Build a restaurant menu app using React Native with [Ignite boilerplate](https://github.com/infinitered/ignite). Customers can browse menu items, add them to cart, and view their order. This project tests React Native fundamentals, state management, and UI/UX skills.

## Setup Requirements
- Use Ignite CLI boilerplate (Already setup in the zip file)
- Target: iOS and Android compatibility
- Use git for version control
- Time limit: 8 productive hours

## Core Features to Implement

### Screen 1: Menu Screen (Home)
- Display menu items fetched from the Food API organized by categories
- Categories: Burgers, Pizzas, Desserts, Drinks (use API endpoints)
- Show item image, name, description, price, and rating
- Category filter/tabs at the top to switch between endpoints
- Add to cart button for each item
- Cart icon with item count badge in header
- Pull-to-refresh to reload menu data
- Loading indicators while fetching from API

### Screen 2: Cart Screen
- List all items added to cart with quantities
- Show item details: name, price, quantity
- Increase/decrease quantity controls
- Remove item from cart option
- Display subtotal, tax, and total
- Clear cart functionality
- Proceed to checkout button (can be a simple alert)

### Screen 3: Item Detail Screen (Bonus)
- Full item details with larger image
- Detailed description and ingredients
- Quantity selector before adding to cart
- Customization options (size, extras)
- Reviews/ratings display

## Technical Requirements

### State Management
- Use MobX-State-Tree (Ignite's default) or Redux Toolkit
- Implement stores for:
  - Menu items by category (fetched from API)
  - Cart state (items, quantities, totals)
  - App state (loading, error, current category filter)
- Handle API loading, error, and success states
- Calculate totals dynamically
- Persist cart data locally
- Cache API responses to avoid unnecessary network calls

### Cart State Example
```json
{
  "items": [
    {
      "menuItem": { /* full menu item object */ },
      "quantity": 2,
      "subtotal": 17.98
    }
  ],
  "itemCount": 3,
  "subtotal": 42.97,
  "tax": 3.44,
  "total": 46.41
}
```

### API Integration
Use the Free Food Menus API (JSON Server): `https://restaurant.wnaji.dev/`

**Available Endpoints:**
- `/bbqs` - BBQ dishes
- `/burgers` - Burger menu
- `/pizzas` - Pizza varieties  
- `/desserts` - Dessert options
- `/drinks` - Beverage menu
- `/fried-chicken` - Chicken dishes
- `/ice-cream` - Ice cream flavors
- `/steaks` - Steak options
- And more...
- 
**API Endpoint Structure:**
- `/<category>` - List of menu items for a specific category
- `/<category>/<item_id>` - Detailed information about a specific item in a category

**API Response Structure:**
```javascript
{
  id: "string",
  img: "image_url",
  name: "Item Name", 
  dsc: "Item description",
  price: 24.99,
  rate: 4.5,
  country: "New York, NY"
}
```

**Implementation Requirements:**
- Fetch from at least 3-4 different category endpoints
- Handle loading states while fetching
- Implement error handling for network failures
- Cache API responses appropriately

### Navigation
- Tab navigation or stack navigation
- Menu → Item Detail → Back to Menu
- Cart accessible from all screens
- Proper header configuration with cart badge

### UI/UX Requirements
- Clean, appetizing food app design
- You can use free templates from behance or create your own
- Grid or list layout for menu items
- Attractive food imagery (use placeholder images when no image available)
- Loading states and empty cart state
- Price formatting and currency display
- Touch feedback for interactive elements (Bonus)
- Smooth animations for add to cart (Bonus)

### Time constraints
- 8 hours for completion
- If core features not done within 8 hours, it is ok. Deliver what you have.
  
## Submission Guidelines
- Use github for version control
- Provide a README with setup instructions and any additional notes if needed
- Submit repo link