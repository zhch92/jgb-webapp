import * as types from '../../mutation-types'
import { getPoint, getPointsRecord } from '../../getters'
import { fetchPoint, fetchPointsRecord } from '../../actions'

const state =  {
    point: {
        totalPoint: 0,
        availPoint: 0,
        frozePoint: 0,
        availDate: '--'
    },
    pointsRecord: {
        limit: 0,
        totalRows: 0,
        pageNo: 0,
        resultList: [
            {
                time: '--',
                actionDesc: '--',
                investorName: '--',
                productName: '--',
                memoType: 0,
                point: 0,
                memo: '--'
            }
        ],
        totalPages: 0
    }
};

const getters = {
    getPoint,
    getPointsRecord
};

const actions = {
    fetchPoint,
    fetchPointsRecord
};

const mutations = {
    [types.GET_POINT_SUCCESS] (state, point) {
        state.point = point;
    },
    [types.GET_POINTSRECORD_SUCCESS] (state, pointsRecord) {
        state.pointsRecord = pointsRecord;
    }
};

export default {
    state,
    getters,
    actions,
    mutations
};
