# [menu-maker.com](https://menu-maker.com)
The purpose of this web app is to allow small business to create a ~~kinda~~ customizable digital menu for FREE. This menu can be shared with link or QR and modified with ease, it also includes some utility functions like changing language (English & Spanish) or "hide" a particular item or category without having to remove it. The user can also change the color palette.

> I know the images used here are in spanish but this example is for an actual restaurant in Baja California called ["La Casa de la Paella"](https://www.facebook.com/casadelapaella/).

## How does it work?

The food categories are displayed on a Masonry format (like Pinterest), that's how it stays compact without a grid. I'm using [react-responsive-masonry](https://www.npmjs.com/package/react-responsive-masonry) to make it work in few lines of code.

The containers for the items are generated based on the available categories for the specific ID of the menu, the items are then assigned automatically. This way the user only needs to specify that Paella is in the Rice category for it to be shown on it.

## User input

After registering and setting up some small details like the name, url and logo, the user will have to insert data in two sections: categories and items. An item needs a category, name, price and description so is wise to go first to create a category, who only needs a name.

![categories 985c9122](https://user-images.githubusercontent.com/32307513/127244262-74caf997-83ab-4c23-800a-bfbec4cbdda1.png)

![items c7dd5fae](https://user-images.githubusercontent.com/32307513/127244258-22ecaa95-85ad-4334-b311-3ad8d13733c4.png)

## How does it look like?

### On PC:

![Web](https://user-images.githubusercontent.com/32307513/127244248-0b16debc-d188-425e-9429-be4627b1ac23.png)

### On mobile:

![Mobile](https://user-images.githubusercontent.com/32307513/127244243-a223e8b4-5e08-461e-a90e-b2a6f6539e84.png)


> Documentation will be added soon
