/**
 * Created by an.han on 16/10/15.
 */
import _ from 'lodash'

export default {
    state: {
        message: '',
        mixedClothes: [],
        username: ''
    },
    mutations: {
        MESSAGE (state, value) {
            state.message = value || state.message;
        },
        addMix (state, payload) {
            state.mixedClothes.push(payload);
        },
        removeMix (state, id) {
            _.remove(state.mixedClothes, {iid:id});
        },
        clearAllMix (state) {
            state.mixedClothes = [];
        },
        saveUser (state, payload) {
            state.username = payload;
        }
    }
}