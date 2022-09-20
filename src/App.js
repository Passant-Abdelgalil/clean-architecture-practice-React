// React imports
import { Route, Routes } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
// Custom components
import SigninComponent from "./features/auth/UI/SigninComponent";
import SignupComponent from "./features/auth/UI/SignupComponent";
import UserFormComponent from "./features/userProfile/UI/UserFormComponent";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AuthorizationRoute from "./components/AuthorizationRoute.jsx";
// Context Provider components
import AuthContextProvider from "./features/auth/data/AuthContextProvider";
import UserProfileContextProvider from "./features/userProfile/data/UserProfileContextProvider";
import UseCasesProvider from "./services/contexts/UseCasesProvider";
// styles
import "./App.css";


function App() {
	return (
		<UseCasesProvider>
			<AuthContextProvider>
				<UserProfileContextProvider>
					<div className="App">
						<Router>
							<Routes>
								<Route
									path="/"
									element={
										<ProtectedRoute>
											<HomePage />
										</ProtectedRoute>
									}
								/>
								<Route
									path="/login"
									element={
										<AuthorizationRoute>
											<SigninComponent />
										</AuthorizationRoute>
									}
								/>
								<Route
									path="/signup"
									element={
										<AuthorizationRoute>
											<SignupComponent />
										</AuthorizationRoute>
									}
								/>
								<Route
									path="/settings"
									element={
										<ProtectedRoute>
											<UserFormComponent />
										</ProtectedRoute>
									}
								/>
							</Routes>
						</Router>
					</div>
				</UserProfileContextProvider>
			</AuthContextProvider>
		</UseCasesProvider>
	);
}

export default App;
