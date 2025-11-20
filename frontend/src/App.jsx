import { useState, useEffect } from 'react'
import MealService from './MealService'
import { FaRobot, FaTrash, FaUtensils, FaSave } from 'react-icons/fa' // You'll need to install this!

function App() {
  const [meals, setMeals] = useState([])
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ dayOfWeek: 'MONDAY', mealType: 'BREAKFAST', itemName: '' })

  const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
  const MEALS = ['BREAKFAST', 'LUNCH', 'DINNER']

  useEffect(() => {
    fetchMeals();
  }, [])

  const fetchMeals = () => {
    MealService.getAllMeals()
      .then(response => setMeals(response.data))
      .catch(error => console.error(error))
  }

  const handleSave = () => {
    if (!form.itemName) return;
    MealService.saveMeal(form).then(() => {
      fetchMeals();
      setForm({ ...form, itemName: '' });
    })
  }

  const handleDelete = (id) => {
    MealService.deleteMeal(id).then(fetchMeals);
  }

  const handleGenerate = () => {
    if(!window.confirm("Overwrite all meals with AI Plan?")) return;
    setLoading(true);
    MealService.generatePlan()
      .then(() => {
        fetchMeals();
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
        alert("AI is busy! Try again.");
      })
  }

  // Helper to get specific meal
  const getMeal = (day, type) => meals.find(m => m.dayOfWeek === day && m.mealType === type);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-8 font-sans">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-500 bg-clip-text text-transparent">
            AI Chef Planner 👨‍🍳
          </h1>
          <button 
            onClick={handleGenerate}
            disabled={loading}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-full font-bold transition-all shadow-lg shadow-purple-500/30 disabled:opacity-50"
          >
            {loading ? <span className="animate-spin">↻</span> : <FaRobot />}
            {loading ? 'Chef is thinking...' : 'AI Surprise Me'}
          </button>
        </div>

        {/* Input Form */}
        <div className="bg-slate-800 p-6 rounded-2xl shadow-xl mb-8 border border-slate-700 flex gap-4 flex-wrap">
          <select 
            className="bg-slate-700 p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-emerald-400 outline-none"
            value={form.dayOfWeek} 
            onChange={e => setForm({...form, dayOfWeek: e.target.value})}
          >
            {DAYS.map(d => <option key={d}>{d}</option>)}
          </select>
          
          <select 
            className="bg-slate-700 p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-emerald-400 outline-none"
            value={form.mealType} 
            onChange={e => setForm({...form, mealType: e.target.value})}
          >
            {MEALS.map(m => <option key={m}>{m}</option>)}
          </select>
          
          <input 
            className="bg-slate-700 p-3 rounded-lg border border-slate-600 focus:ring-2 focus:ring-emerald-400 outline-none flex-grow"
            placeholder="Enter a meal..." 
            value={form.itemName}
            onChange={e => setForm({...form, itemName: e.target.value})}
          />
          
          <button 
            onClick={handleSave}
            className="bg-emerald-500 hover:bg-emerald-600 p-3 px-6 rounded-lg font-bold flex items-center gap-2 transition-colors"
          >
            <FaSave /> Save
          </button>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4">
          {DAYS.map(day => (
            <div key={day} className="bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col">
              <div className="bg-slate-700/50 p-3 text-center font-bold text-emerald-400 border-b border-slate-700">
                {day.substring(0, 3)}
              </div>
              <div className="p-3 flex flex-col gap-3 flex-grow">
                {MEALS.map(type => {
                  const meal = getMeal(day, type);
                  return (
                    <div key={type} className="relative group">
                      <div className="text-xs text-slate-500 mb-1 font-semibold tracking-wider">{type}</div>
                      {meal ? (
                        <div className="bg-slate-700/40 p-2 rounded text-sm border-l-2 border-emerald-500 flex justify-between items-start group-hover:bg-slate-700 transition-colors">
                          <span>{meal.itemName}</span>
                          <button 
                            onClick={() => handleDelete(meal.id)}
                            className="text-red-400 hover:text-red-300 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <FaTrash size={12} />
                          </button>
                        </div>
                      ) : (
                        <div className="h-8 border-2 border-dashed border-slate-700 rounded opacity-50"></div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}

export default App