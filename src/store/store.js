import { createStore } from 'vuex'

export const store = createStore({
	state () {
	  return {
		allergies: []
	  }
	},
	mutations: {
		setAllergies (state, payload) {
		  state.allergies = payload;
		}
	  }
  })