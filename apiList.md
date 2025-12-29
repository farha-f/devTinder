# Dev tinder API List 

## authRouter
-POST /Signup
-POST /Login
-POST /Logout

## profileRouter
-GET /Profile/view
-PATCH /Profile/edit
-PATCH /Password/edit - forgot password

## connectRequestRouter
-POST /request/send/interested/:userId
-POST /request/send/ignore/:userId
-POST /request/review/Accepted/:requestId
-POST /request/review/Rejected/:requestId

## userRouter
-GET /user/connection
-GET /user/requests/recieved
_GET /user/feed gets your profile of other users

Status: ignore, intereseted, accepted, reject
