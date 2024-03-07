import { CarProps, FilterProps } from "@/types";

export async function fetchCars(filters: FilterProps){
    const {fuel, year, manufacturer,model, limit} = filters
    const queryParams = [];

    if (manufacturer) {
        queryParams.push(`make=${manufacturer}`);
    }
    if (year) {
        queryParams.push(`year=${year}`);
    }
    if (model) {
        queryParams.push(`model=${model}`);
    }
    if (limit) {
        queryParams.push(`limit=${limit}`);
    }
    if (fuel) {
        queryParams.push(`fuel_type=${fuel}`);
    }

    const url = `https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?${queryParams.join('&')}`;

    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'f18ef43a9cmsh7a669162ccc51bep1e32a8jsn1493098109c4',
            'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json();
        // console.log(result)
        return result;
    } catch (error) {
        console.log(error)
    }

}

export const calculateCarRent = (city_mpg: number, year: number) => {
  const basePricePerDay = 50; // Base rental price per day in dollars
  const mileageFactor = 0.1; // Additional rate per mile driven
  const ageFactor = 0.05; // Additional rate per year of vehicle age

  // Calculate additional rate based on mileage and age
  const mileageRate = city_mpg * mileageFactor;
  const ageRate = (new Date().getFullYear() - year) * ageFactor;

  // Calculate total rental rate per day
  const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

  return rentalRatePerDay.toFixed(0);
};

export const generateCarImageUrl = (car: CarProps, angle?: string) => {
  const url = new URL("https://cdn.imagin.studio/getimage");
  const { make, model, year } = car;

  url.searchParams.append('customer', process.env.NEXT_PUBLIC_IMAGIN_API_KEY || 'hrjavascript-mastery');
  url.searchParams.append('make', make);
  url.searchParams.append('modelFamily', model.split(" ")[0]);
  url.searchParams.append('zoomType', 'fullscreen');
  url.searchParams.append('modelYear', `${year}`);
  // url.searchParams.append('zoomLevel', zoomLevel);
  url.searchParams.append('angle', `${angle}`);

  return `${url}`;
} 

export const updateSearchParams = (type: string, value: string)=>{
    const searchParams = new URLSearchParams(window.location.search)

    searchParams.set(type, value)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname

}