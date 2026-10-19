// ---------------------------------------------------------------
// DISH DATABASE
// Each dish has:
//   name      - shown on screen
//   pack      - "kerala" or "world" (used by the cuisine pack picker)
//   cuisine   - small label under the dish name
//   real      - ingredients that truly belong (we pick 3 at random each round)
//   imposters - ingredients that do NOT belong, each with a short reason
//
// To add a dish, copy one block below and change the values.
// Keep at least 3 items in "real" and at least 1 in "imposters".
// ---------------------------------------------------------------
const DISHES = [
  {
    name: "Appam", pack: "kerala", cuisine: "Kerala breakfast",
    real: ["Raw rice", "Coconut milk", "Yeast", "Sugar", "Grated coconut", "Salt"],
    imposters: [
      { item: "Soy sauce", why: "Appam is a fermented rice and coconut hopper. Soy sauce has no place in the batter." },
      { item: "Cheddar cheese", why: "Appam is dairy-light and coconut-based, so cheese doesn’t belong." },
      { item: "Chocolate chips", why: "Appam is served plain with stew or curry, never with chocolate." }
    ]
  },
  {
    name: "Puttu", pack: "kerala", cuisine: "Kerala breakfast",
    real: ["Rice flour", "Grated coconut", "Salt", "Water", "Kadala curry"],
    imposters: [
      { item: "Peanut butter", why: "Puttu is steamed rice flour layered with coconut. Peanut butter isn’t part of it." },
      { item: "Mozzarella", why: "Puttu is steamed with coconut, not cheese." },
      { item: "Baking powder", why: "Puttu is steamed in layers and doesn’t rise, so it needs no baking powder." }
    ]
  },
  {
    name: "Sambar", pack: "kerala", cuisine: "South Indian lentil stew",
    real: ["Toor dal", "Tamarind", "Sambar powder", "Drumstick", "Pumpkin", "Mustard seeds", "Curry leaves"],
    imposters: [
      { item: "Heavy cream", why: "Sambar gets its body from dal and tamarind. Cream would make it a different dish." },
      { item: "Oregano", why: "Oregano is Mediterranean. Sambar uses curry leaves and sambar powder." },
      { item: "Butter", why: "Sambar is tempered in oil or ghee, not finished with butter." }
    ]
  },
  {
    name: "Avial", pack: "kerala", cuisine: "Kerala sadya dish",
    real: ["Raw banana", "Yam", "Drumstick", "Grated coconut", "Curd", "Curry leaves", "Coconut oil"],
    imposters: [
      { item: "Soy sauce", why: "Avial is a coconut and curd mixed vegetable dish. Soy sauce isn’t part of it." },
      { item: "Tomato ketchup", why: "Avial’s sourness comes from curd or raw mango, not ketchup." },
      { item: "Parmesan", why: "Avial has curd and coconut. Parmesan is an Italian aged cheese." }
    ]
  },
  {
    name: "Palada Payasam", pack: "kerala", cuisine: "Kerala dessert",
    real: ["Milk", "Rice ada", "Sugar", "Cardamom", "Ghee", "Cashews"],
    imposters: [
      { item: "Garlic", why: "Payasam is a sweet milk dessert. Garlic is savoury." },
      { item: "Vinegar", why: "Vinegar would curdle the milk and ruin the dessert." },
      { item: "Soy sauce", why: "Payasam is sweet and creamy, so soy sauce has no role." }
    ]
  },
  {
    name: "Karimeen Pollichathu", pack: "kerala", cuisine: "Kerala fish dish",
    real: ["Pearl spot fish", "Banana leaf", "Shallots", "Kodampuli", "Turmeric", "Curry leaves", "Red chilli"],
    imposters: [
      { item: "Maple syrup", why: "This is a spicy masala fish wrapped in banana leaf. Maple syrup is a sweet topping for pancakes." },
      { item: "Whipped cream", why: "Pollichathu is a roasted masala dish with no dairy topping." },
      { item: "Rolled oats", why: "Oats are a breakfast cereal, not part of a fish masala." }
    ]
  },
  {
    name: "Masala Dosa", pack: "kerala", cuisine: "South Indian classic",
    real: ["Dosa batter", "Potato", "Onion", "Mustard seeds", "Turmeric", "Curry leaves", "Green chilli"],
    imposters: [
      { item: "Mozzarella", why: "Masala dosa is filled with spiced potato, not melted cheese." },
      { item: "Boiled pasta", why: "Pasta isn’t part of a South Indian dosa." },
      { item: "Chocolate sauce", why: "Masala dosa is savoury, so chocolate sauce doesn’t belong." }
    ]
  },
  {
    name: "Idli", pack: "kerala", cuisine: "South Indian breakfast",
    real: ["Idli rice", "Urad dal", "Salt", "Fenugreek seeds", "Water"],
    imposters: [
      { item: "Cocoa powder", why: "Idli is a plain steamed rice and lentil cake. Cocoa has no place in it." },
      { item: "Cream cheese", why: "Idli batter is only rice, urad dal and salt." },
      { item: "Pasta", why: "Idli is made from fermented rice and urad dal, not wheat pasta." }
    ]
  },
  {
    name: "Kerala Parotta", pack: "kerala", cuisine: "Kerala flatbread",
    real: ["Maida", "Oil", "Egg", "Sugar", "Salt", "Water"],
    imposters: [
      { item: "Basmati rice", why: "Parotta is a layered flatbread made from refined wheat flour (maida), not rice." },
      { item: "Soy sauce", why: "Parotta dough is flour, oil, salt, sugar and water." },
      { item: "Fresh basil", why: "Basil is an Italian herb. Parotta dough has none." }
    ]
  },
  {
    name: "Kerala Chicken Curry", pack: "kerala", cuisine: "Kerala curry",
    real: ["Chicken", "Coconut oil", "Shallots", "Ginger", "Curry leaves", "Red chilli powder", "Coconut milk"],
    imposters: [
      { item: "Whipped cream", why: "Kerala curry gets richness from coconut, not whipped cream." },
      { item: "Maple syrup", why: "This is a spicy savoury curry. Maple syrup would clash with it." },
      { item: "Oregano", why: "Oregano isn’t used in Kerala cooking. Curry leaves are." }
    ]
  },
  {
    name: "Fish Moilee", pack: "kerala", cuisine: "Kerala fish stew",
    real: ["Fish", "Coconut milk", "Green chilli", "Ginger", "Shallots", "Curry leaves", "Turmeric"],
    imposters: [
      { item: "Peanut butter", why: "Moilee is a mild coconut milk stew. Peanut butter would overpower it." },
      { item: "Cheddar cheese", why: "Moilee’s creaminess comes from coconut milk, not cheese." },
      { item: "Dried oregano", why: "Oregano is Mediterranean. Moilee uses curry leaves and ginger." }
    ]
  },
  {
    name: "Pazham Pori", pack: "kerala", cuisine: "Kerala tea-time snack",
    real: ["Ripe nendran banana", "Maida", "Sugar", "Turmeric", "Oil", "Rice flour"],
    imposters: [
      { item: "Garlic", why: "Pazham pori is a sweet fried banana fritter. Garlic is savoury." },
      { item: "Soy sauce", why: "The batter is flour, sugar and turmeric, with no soy sauce." },
      { item: "Parmesan", why: "Pazham pori is a sweet snack, so Parmesan doesn’t belong." }
    ]
  },
  {
    name: "Chicken Biryani", pack: "kerala", cuisine: "Malabar classic",
    real: ["Basmati rice", "Saffron", "Yogurt", "Fried onions", "Garam masala", "Mint leaves", "Ghee"],
    imposters: [
      { item: "Peanut butter", why: "Biryani layers rice and marinated meat with whole spices. Peanut butter isn’t one of them." },
      { item: "Condensed milk", why: "Biryani is savoury, so condensed milk doesn’t belong." },
      { item: "Rolled oats", why: "Biryani is a rice dish. Oats are a breakfast grain." }
    ]
  },
  {
    name: "Pizza Margherita", pack: "world", cuisine: "Italian",
    real: ["Pizza dough", "San Marzano tomatoes", "Mozzarella", "Fresh basil", "Olive oil"],
    imposters: [
      { item: "Tamarind", why: "Margherita is tomato, mozzarella and basil. Tamarind is an Indian souring agent." },
      { item: "Soy sauce", why: "A classic Margherita has no soy sauce." },
      { item: "Cardamom", why: "Cardamom is a sweet-spicy pod from Indian and Nordic cooking, not Italian pizza." }
    ]
  },
  {
    name: "Spaghetti Carbonara", pack: "world", cuisine: "Roman pasta",
    real: ["Spaghetti", "Egg yolks", "Pecorino Romano", "Guanciale", "Black pepper"],
    imposters: [
      { item: "Heavy cream", why: "Real carbonara gets its sauce from egg yolk, cheese and pasta water. Cream is the classic imposter." },
      { item: "Tomato ketchup", why: "Carbonara has no tomato of any kind." },
      { item: "Pineapple", why: "Pineapple is a fruit with no place in a Roman egg-and-cheese pasta." }
    ]
  },
  {
    name: "Sushi Rolls", pack: "world", cuisine: "Japanese",
    real: ["Sushi rice", "Nori", "Rice vinegar", "Raw fish", "Wasabi", "Cucumber"],
    imposters: [
      { item: "Cheddar cheese", why: "Cheddar is not used in Japanese sushi." },
      { item: "Tomato ketchup", why: "Sushi is seasoned with rice vinegar and soy sauce, not ketchup." },
      { item: "Garam masala", why: "Garam masala is an Indian spice blend." }
    ]
  },
  {
    name: "Guacamole", pack: "world", cuisine: "Mexican",
    real: ["Avocado", "Lime juice", "Cilantro", "Red onion", "Salt", "Jalapeño"],
    imposters: [
      { item: "Cocoa powder", why: "Guacamole is a savoury avocado dip, so cocoa doesn’t belong." },
      { item: "Honey", why: "Guacamole is fresh and sharp. Honey would make it sweet." },
      { item: "Soy sauce", why: "Soy sauce is Asian. Guacamole uses lime and salt." }
    ]
  },
  {
    name: "Pancakes", pack: "world", cuisine: "Breakfast",
    real: ["Flour", "Milk", "Eggs", "Baking powder", "Butter", "Sugar"],
    imposters: [
      { item: "Garlic", why: "Pancakes are a sweet breakfast batter. Garlic is savoury." },
      { item: "Fish sauce", why: "Fish sauce is a salty Southeast Asian condiment, not a pancake ingredient." },
      { item: "Red chilli powder", why: "Pancake batter is mild and sweet, so chilli doesn’t belong." }
    ]
  },
  {
    name: "Pani Puri", pack: "world", cuisine: "Indian street food",
    real: ["Semolina puris", "Boiled potato", "Chickpeas", "Tamarind water", "Mint", "Black salt"],
    imposters: [
      { item: "Mayonnaise", why: "Pani puri is tangy, spicy and watery. Mayonnaise would ruin it." },
      { item: "Cheddar cheese", why: "Pani puri is a street snack with no cheese." },
      { item: "Chocolate sauce", why: "Pani puri is savoury and sour, not sweet and chocolatey." }
    ]
  },
  {
    name: "Chocolate Chip Cookies", pack: "world", cuisine: "Baking",
    real: ["Butter", "Brown sugar", "Flour", "Chocolate chips", "Eggs", "Vanilla"],
    imposters: [
      { item: "Garlic", why: "Cookies are sweet. Garlic would taste awful in them." },
      { item: "Curry leaves", why: "Curry leaves are for savoury South Indian cooking, not baking." },
      { item: "Fish sauce", why: "Fish sauce is salty and savoury, so it doesn’t belong in cookies." }
    ]
  },
  {
    name: "Tomato Soup", pack: "world", cuisine: "Comfort food",
    real: ["Ripe tomatoes", "Onion", "Garlic", "Basil", "Butter", "Vegetable stock"],
    imposters: [
      { item: "Peanut butter", why: "Tomato soup is a simple tomato and onion base. Peanut butter doesn’t fit it." },
      { item: "Vanilla extract", why: "Vanilla is for desserts, not savoury soup." },
      { item: "Chocolate chips", why: "Chocolate chips are a dessert ingredient." }
    ]
  },
  {
    name: "Fish and Chips", pack: "world", cuisine: "British classic",
    real: ["White fish", "Potatoes", "Flour batter", "Malt vinegar", "Salt", "Oil"],
    imposters: [
      { item: "Coconut milk", why: "Fish and chips is deep-fried in batter. Coconut milk is for curries and stews." },
      { item: "Honey", why: "Fish and chips is served with salt and vinegar, not honey." },
      { item: "Saffron", why: "Saffron is a costly spice for rice and desserts, not a chip-shop ingredient." }
    ]
  },
  {
    name: "Hummus", pack: "world", cuisine: "Middle Eastern",
    real: ["Chickpeas", "Tahini", "Lemon juice", "Garlic", "Olive oil", "Cumin"],
    imposters: [
      { item: "Peanut butter", why: "Hummus uses tahini, which is sesame paste. Peanut butter is a different paste." },
      { item: "Maple syrup", why: "Hummus is savoury and tangy, not sweet." },
      { item: "Condensed milk", why: "Hummus is a vegan dip, so milk doesn’t belong." }
    ]
  },
  {
    name: "Ramen", pack: "world", cuisine: "Japanese noodle soup",
    real: ["Wheat noodles", "Pork or chicken broth", "Soy sauce", "Soft-boiled egg", "Spring onion", "Nori"],
    imposters: [
      { item: "Cheddar cheese", why: "Ramen has a savoury broth, noodles and toppings. Cheddar isn’t one of them." },
      { item: "Maple syrup", why: "Ramen is savoury, so maple syrup doesn’t belong." },
      { item: "Cardamom", why: "Cardamom is an Indian sweet-spicy pod, not a ramen flavour." }
    ]
  }
];
