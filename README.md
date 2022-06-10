# robot_store

Robot-Store API
----
## GET all product info from the API

### URL

/products

### Method:
`GET`

### URL Params
## Required Params
There are no required params 

## Optional Params 
`category` 
`character`

### Success Response:

Code: 200 <br />
Content:
  ```
    {
      "status": 200,
      "message": "The database request was successful",
      "data": [
        {
          "id": 1,
          "image": "https://binaryville.com/images/products/fred-0s1s-apron-black.jpg",
          "title": "It's All 0's and 1's to Me! Apron",
          "price": 24
        },
        {
          "id": 2,
          "image": "https://binaryville.com/images/products/dolores-compute-apron-black.jpg",
          "title": "I Compute, Therefore I Am Apron",
          "price": 24
        },
        {
          "id": 3,
          "image": "https://binaryville.com/images/products/bubbles-gumball-apron-black.jpg",
          "title": "A Gumball for Your Thoughts Apron",
          "price": 24
        }
      } 
    ]
  }

```


### Error response
Code: 404 <br />
Content:


        {
        "status": 404,
        "message": "Oh no! The page you were looking for has not been found!"
        }


## GET single product using given ID from the API

### URL
/products/[:id]

### Method
`GET`

### URL Params
#### Required:
`id`

#### Optional:
There are no optional params

#### Example
`/products/6`

### Success Response:

Code: 200 <br />
Content:
  ```
    {
        {
        "status": 200,
        "message": "The database request was successful",
        "data": {
            "id": 6,
            "title": "I Compute, Therefore I Am Baseball Hat",
            "price": 29,
            "image": "https://binaryville.com/images/products/dolores-compute-baseballhat-black.jpg",
            "category_id": 2,
            "character_id": "Baseball Hats",
            "character": "Dolores",
            "description": "Cheer the team on in style with our unstructured, low crown, six-panel baseball cap made of 100% organic cotton twill. Featuring our original Binaryville artwork, screen-printed with PVC- and phthalate-free inks. Complete with matching, sewn eyelets, and adjustable fabric closure. ",
            "image2": "https://binaryville.com/images/products/dolores-compute-baseballhat-gray.jpg",
            "image3": null
       }
    }

```
### Error response:
code: 400 <br/>
content:
````
{
    "status": 400,
    "message": "There is no item matching that ID, please try again"
}
````

## Edit item in database
## URL
/products/edit/[:id]

### Method
`PUT`

### URL params
#### Required:
`id`

#### Optional:
There are no optional params

#### Example
`/products/6`

### PUT params
#### Required:
`title`
`price`
`image`
`category`

#### Optional:
`image`
`category_id`
`character_id`
`character`
`description`
`image2`
`image3`
`is_deleted`

#### Example
`/products/6`

### Success Response:
Code: 200, <br/>
Content:
```
{
    "status": 200,
    "message": "item [itemTitle] has been amended"
}

```
