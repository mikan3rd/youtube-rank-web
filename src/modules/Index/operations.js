// @flow
import {fork, put, takeLatest, call} from 'redux-saga/effects';
import Actions from './actions';
import ApiClient from '../../helpers/ApiClient';
import {type ActionType} from 'redux-actions';

export default function* (): Generator<*, *, *> {

}

function* signupProvsion(action: ActionType<typeof Actions.signupProvsion>) : Generator<*, *, *> {

}
