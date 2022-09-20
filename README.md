# Auth App

A simple auth app where you can sign in/out and sign up and also update your name, email, and photo.
A toy app in which I studied and applied the clean architecture for front-end apps with React.

Credits go to:
- [RostislavDugin](https://github.com/RostislavDugin)
  - [Repo](https://github.com/RostislavDugin/clean-architecture-react-typescript)
  - [Medium Article](https://medium.com/@rostislavdugin/the-clean-architecture-using-react-and-typescript-a832662af803)
  
- Me :)
  - For having patience to gain new skills ^_^


Techonolgies:
- React
- Firebase

### Folder Structure 
```

┣ 📦public
┃ ┣ 📜favicon.ico
┃ ┣ 📜index.html
┃ ┣ 📜logo192.png
┃ ┣ 📜logo512.png
┃ ┣ 📜manifest.json
┃ ┗ 📜robots.txt
┣ 📦src
┃ ┣ 📂components
┃ ┃ ┣ 📜AuthorizationRoute.jsx
┃ ┃ ┣ 📜ProtectedRoute.jsx
┃ ┃ ┗ 📜Spinner.jsx
┃ ┣ 📂features
┃ ┃ ┣ 📂auth
┃ ┃ ┃ ┣ 📂UI
┃ ┃ ┃ ┃ ┣ 📜SigninComponent.jsx
┃ ┃ ┃ ┃ ┣ 📜SigninViewModel.js
┃ ┃ ┃ ┃ ┣ 📜SignupComponent.jsx
┃ ┃ ┃ ┃ ┗ 📜SignupViewModel.js
┃ ┃ ┃ ┣ 📂data
┃ ┃ ┃ ┃ ┣ 📜AuthApi.js
┃ ┃ ┃ ┃ ┣ 📜AuthContextProvider.js
┃ ┃ ┃ ┃ ┗ 📜AuthStorage.js
┃ ┃ ┃ ┗ 📂domain
┃ ┃ ┃   ┣ 📂Repositories
┃ ┃ ┃   ┃ ┗ 📜AuthApiRepository.js
┃ ┃ ┃   ┣ 📂datastructures
┃ ┃ ┃   ┃ ┗ 📜AuthorizationResult.js
┃ ┃ ┃   ┣ 📂entities
┃ ┃ ┃   ┃ ┗ 📜AuthHolder.js
┃ ┃ ┃   ┗ 📂usecases
┃ ┃ ┃     ┣ 📜LoginUseCase.js
┃ ┃ ┃     ┣ 📜LogoutUseCase.js
┃ ┃ ┃     ┗ 📜SignupUseCase.js
┃ ┃ ┗ 📂userProfile
┃ ┃   ┣ 📂UI
┃ ┃   ┃ ┣ 📜UserFormComponent.jsx
┃ ┃   ┃ ┣ 📜UserFormViewModel.js
┃ ┃   ┃ ┗ 📜UserProfileComponent.jsx
┃ ┃   ┣ 📂data
┃ ┃   ┃ ┣ 📜UserApi.js
┃ ┃   ┃ ┣ 📜UserProfileContextProvider.js
┃ ┃   ┃ ┗ 📜UserStorage.js
┃ ┃   ┗ 📂domain
┃ ┃     ┣ 📂Repositories
┃ ┃     ┃ ┗ 📜UserApiRepository.js
┃ ┃     ┣ 📂datastructures
┃ ┃     ┃ ┗ 📜UserProfile.js
┃ ┃     ┣ 📂entities
┃ ┃     ┃ ┗ 📜userHolder.js
┃ ┃     ┗ 📂usecases
┃ ┃       ┣ 📜UpdateUserEmailUseCase.js
┃ ┃       ┗ 📜UpdateUserProfileUseCase.js
┃ ┣ 📂pages
┃ ┃ ┗ 📜HomePage.jsx
┃ ┣ 📂services
┃ ┃ ┣ 📂contexts
┃ ┃ ┃ ┗ 📜UseCasesProvider.js
┃ ┃ ┣ 📂localStorage
┃ ┃ ┃ ┗ 📜LocalStorageRepository.js
┃ ┃ ┗ 📜firebase-config.js
┃ ┣ 📂util
┃ ┃ ┗ 📜FormValidation.js
┃ ┣ 📜App.css
┃ ┣ 📜App.js
┃ ┣ 📜App.test.js
┃ ┣ 📜index.css
┃ ┣ 📜index.js
┃ ┣ 📜logo.svg
┃ ┣ 📜reportWebVitals.js
┃ ┣ 📜settings.js
┃ ┗ 📜setupTests.js
┃
┣ package-lock.json
┣ package.json
┣ .gitignore
┣ .env
┗ README.md
```