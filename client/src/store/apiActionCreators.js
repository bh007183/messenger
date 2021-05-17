import {createAction} from "@reduxjs/toolkit"

export const apiCallBegan = createAction("api/CallBegan")
export const apiCallSuccess = createAction("api/CallSuccess")
export const apiCallFailed = createAction("api/CallFailed")

export const socketCallBegan = createAction("socket/CallBegan")
export const socketCallSuccess = createAction("socket/CallSuccess")
export const socketCallFailed = createAction("socket/CallFailed")