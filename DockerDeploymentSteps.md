1. First clone the repository into the docker eviornment
```bash
git clone https://github.com/Hemant-Yadav-115298/WeatherApp-Project
```

2. Enter the folder and create file names as Variable
```bash
cd WeatherApp-Project
vim Varibles
```

3. Paste the envionment veriables in it and save
   For pasting use command `shift + insert`
```bash
REACT_APP_WEATHER_API_KEY=___
REACT_APP_CITY_AUTOCOMPLETE_API_KEY=___
```
  For saving click `Esc` then `:wq` and click `Enter`

4. Verify file
```bash
cat Varibles
```
 This will show the pasted content

5. Run the commands for building and running the docker
```bash
docker build -t my-react-app .
docker run -p 80:80 my-react-app
```
