export default {
    features: {
        auth: true
    },
    editor: {
        settings: [
            {
                label: 'Configuration',
                icon: 'advanced',
                edit: () => import('./src/components/Configuration/SettingsEdit.vue'),
                summary: () => import('./src/components/Configuration/SettingsSummary.vue'),
                getIsValid() {
                    return true;
                },
            },
        ],
        designSystemId: '053d6253-48d1-4298-9ddc-d6a542fa400a',
    },
    variables: [
        { name: 'user', value: 'user', type: 'object', defaultValue: null },
        { name: 'isAuthenticated', value: 'isAuthenticated', type: 'boolean', defaultValue: false },
    ],
    actions: [
        {
            name: 'Sign Up',
            code: 'signUp',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/SignUp.vue'),
            getIsValid({ email, password }) {
                return !!email && !!password;
            },
            copilot: {
                description: "Creates a new user account with the provided email and password",
                returns: "object (user data)",
                schema: {
                    email: {
                        type: "string",
                        description: "Email address for the new user account",
                        bindable: true
                    },
                    password: {
                        type: "string", 
                        description: "Password for the new user account",
                        bindable: true
                    },
                    name: {
                        type: "string",
                        description: "Optional display name for the user",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Login',
            code: 'login',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/Login.vue'),
            getIsValid({ email, password }) {
                return !!email && !!password;
            },
            copilot: {
                description: "Authenticates a user with their email and password",
                returns: "object (user data)",
                schema: {
                    email: {
                        type: "string",
                        description: "Email address of the user",
                        bindable: true
                    },
                    password: {
                        type: "string",
                        description: "User's password",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Update User Profile',
            code: 'updateUserProfile',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/UpdateUserProfile.vue'),
            getIsValid({ email }) {
                return !!email;
            },
            copilot: {
                description: "Updates the current user's profile information",
                returns: "object (updated user data)",
                schema: {
                    email: {
                        type: "string",
                        description: "New email address for the user",
                        bindable: true
                    },
                    name: {
                        type: "string",
                        description: "New display name for the user",
                        bindable: true
                    },
                    attributes: {
                        type: "array",
                        description: "Array of custom user attributes to update",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Change Password',
            code: 'changePassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ChangePassword.vue'),
            getIsValid({ oldPassword, newPassword }) {
                return !!oldPassword && !!newPassword;
            },
            copilot: {
                description: "Changes the current user's password",
                returns: "void",
                schema: {
                    oldPassword: {
                        type: "string",
                        description: "User's current password",
                        bindable: true
                    },
                    newPassword: {
                        type: "string",
                        description: "New password to set",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Forgot Password',
            code: 'forgotPassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ForgotPassword.vue'),
            getIsValid({ email }) {
                return email;
            },
            copilot: {
                description: "Initiates the password reset process by sending a verification code",
                returns: "void",
                schema: {
                    email: {
                        type: "string",
                        description: "Email address of the account to reset",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Confirm Password',
            code: 'confirmPassword',
            isAsync: true,
            /* wwEditor:start */
            edit: () => import('./src/components/Functions/ConfirmPassword.vue'),
            getIsValid({ verificationCode, newPassword }) {
                return !!verificationCode && !!newPassword;
            },
            copilot: {
                description: "Completes the password reset process using the verification code",
                returns: "void",
                schema: {
                    verificationCode: {
                        type: "string",
                        description: "Verification code received via email",
                        bindable: true
                    },
                    newPassword: {
                        type: "string",
                        description: "New password to set",
                        bindable: true
                    }
                }
            },
            /* wwEditor:end */
        },
        {
            name: 'Logout',
            code: 'logout',
            /* wwEditor:start */
            copilot: {
                description: "Logs out the current user and clears their session",
                returns: "void",
                schema: {}
            },
            /* wwEditor:end */
        },
    ],
};