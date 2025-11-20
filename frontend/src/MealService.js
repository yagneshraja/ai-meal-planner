import axios from 'axios';

// The address of your Backend Island
const API_URL = "http://localhost:8081/api/meals";

class MealService {
    
    // 1. Get all meals from the Database
    getAllMeals() {
        return axios.get(API_URL);
    }

    // 2. Save a new meal to the Database
    saveMeal(meal) {
        return axios.post(API_URL, meal);
    }

    // 3. Delete a meal from the Database
    deleteMeal(id) {
        return axios.delete(API_URL + '/' + id);
    }

    // 4. Ask AI to generate a plan
    generatePlan() {
        return axios.post(API_URL + '/generate');
    }
}

export default new MealService();