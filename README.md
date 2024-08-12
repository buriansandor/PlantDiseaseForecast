# Plant Disease Forecast


<center><img src="https://github.com/buriansandor/PlantDiseaseForecast/blob/main/css/Fruit%20disease%20forecast.jpg"></img><br><b><i>Predict, Protect, Prosper: Our web app forecasts fruit diseases using real-time weather data, empowering growers to safeguard their crops and maximize yields.</b></i></center>

> This web app is designed to forecast plant diseases by analyzing weather conditions, helping growers take timely action to protect their crops. To create this tool, we first compiled a comprehensive Fruit Disease Names dataset, focusing on common diseases affecting apples, apricots, cherries, grapes, peaches, and pears. Leveraging the power of Google AI Studio with Gemini 1.5 I generated detailed disease parameters, which were then stored in a Fruit Disease Dataset. This dataset serves as the foundation for the app’s predictive capabilities.
> 
> To start using the app, you'll need your own OpenWeather API key, which you can easily obtain for free by registering at [OpenWeatherMap](https://openweathermap.org)). With this free key, our app can pull real-time weather data specific to your location, analyze the conditions, and forecast potential fruit diseases. This empowers you to proactively manage crop health, optimize yields, and reduce losses.

*This project was created for <a href="https://ai.google.dev/competition"> Gemini API Developer Competition</a> in 2024.*
_________________________________________________________________

| [Get the User Manual here](documentation/FDF%20user%20manual.pdf)   | [YouTube]() |
| ------------------------------------------------------------------- |---------------------- |
_________________________________________________________________

## Methodology
The main idea is to forecast plant diseases based on weather conditions. To achieve this I collected the fruit tree diseases from Wikipedia and agriculturar websites in a [Fruit disease names](https://www.kaggle.com/datasets/sndorburian/fruit-tree-disease-names) dataset. 

Main source of names:
- https://en.wikipedia.org/wiki/List_of_apple_diseases
- https://en.wikipedia.org/wiki/List_of_apricot_diseases
- https://en.wikipedia.org/wiki/List_of_pear_diseases
- https://www.lawnstarter.com/blog/tree-care/cherry-tree-diseases-how-treat/
- https://en.wikipedia.org/wiki/List_of_peach_and_nectarine_diseases
- https://en.wikipedia.org/wiki/List_of_grape_diseases

Based on that I Used Google AI Studio with Gemini 1.5, temp 1 to generate disease parameters and I saved this in a [Fruit disease dataset](https://www.kaggle.com/datasets/sndorburian/fruit-disease/data). I included *apple, apricot, cherry, grape, peach, pear* diseases. 

Example prompt what I used to generate the data: 
```text
Act as a professional botanist. Give me a description of USA-based apricot fungal, bacterial, viral, and abiotic diseases, regarding in what weather conditions can that disease occur. Give me the results in a JSON file. An object should contain the humidity, temperature, relative dewpoint, wind speed and typical month when it is active. In the object give me the link to the Wikipedia article of the disease as well. Give me a list of the symptoms of the diseases as well. Every value in the JSON should be a range or an exact number. The degree should be calculated in Celsius. Kep this structure {
  "diseases": [
    {
      "name": "Disease Name",
      "type": "Fungal/Bacterial/Viral/Abiotic",
      "symptoms": [
        "Symptom 1",
        "Symptom 2",
        ...
      ],
      "weather_conditions": {
        "humidity": {
          "min": 0,
          "max": 100
        },
        "temperature": {
          "min": -50,
          "max": 50
        },
        "relative_dewpoint": {
          "min": -50,
          "max": 50
        },
        "wind_speed": {
          "min": 0,
          "max": 100
        },
        "active": {
          "start_date": 1, "start_month": "January",
          "end_date": 12, "end_month": "December"
        }
      },
      "wikipedia_link": "https://en.wikipedia.org/wiki/Disease_Name"
    },
    // ... more diseases
  ]
}
and do it with these diseases: Bacterial canker and blast
Bacterial spot
Crown gall
Alternaria spot and fruit rot
Armillaria crown and root rot (shoestring crown and root rot)
Brown rot blossom and twig blight and fruit rot
Ceratocystis canker
Dematophora root rot
Eutypa dieback
Green fruit rot
Leaf spot
Phytophthora crown and root rot
Phytophthora pruning wound canker
Powdery mildew
Replant problems
Rhizopus fruit rot
Ripe fruit rot
Scab
Shot hole
Silver leaf
Verticillium wilt
Wood rots (pathogenicity has not been proven for these fungi)
Dagger
Lesion
Ring
Root-knot
Bare twig and unfruitfulness
Line pattern & Necrotic ring spot
Peach mosaic
Plum pox (= Sharka)
Prunus stem pitting
Pseudopox
Viral gummosis
Asteroid spot (= Peach asteroid spot)
Cherry mottle leaf
Chlorotic leaf mottle
Deformation mosaic (associated with an isometric particle)
Moorpark mottle
Peach yellow mottle
Pucker leaf
Ring pox (= Spur cherry?)
Stone pitting
Chlorotic leaf roll (= Apple proliferation)
Apricot gumboil
Replant problems
```
