export default {
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
            {
                label: 'Define redirections (URLs)',
                icon: 'open-out',
                edit: () => import('./src/components/Redirections/SettingsEdit.vue'),
                summary: () => import('./src/components/Redirections/SettingsSummary.vue'),
                getIsValid(settings) {
                    const { afterNotSignInPageId } = settings.publicData;
                    return !!afterNotSignInPageId;
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
                description: 'Sign up a new user',
                returns: 'null',
                schema: `{
                    email: __VALUE__,
                    password: __VALUE__,
                    name: __VALUE__
                }`
            }
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
                description: 'Log in a user',
                returns: 'null',
                schema: `{
                    email: __VALUE__,
                    password: __VALUE__
                }`
            }
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
                description: 'Update User Profile',
                returns: 'null',
                schema: `{
                    email: __VALUE__,
                    name: __VALUE__,
                    attributes: [
                        {
                            key: "{{One of the following: 'picture', 'given_name', 'family_name', 'middle_name', 'nickname', 'profile', 'website', 'gender', 'birthdate', 'zoneinfo', 'locale', 'address', 'phone_number'}}",
                            type: "string",
                            value: __VALUE__
                        },
                        ...
                    ]
                }`
            }
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
                description: 'Change Password',
                returns: 'null',
                schema: `{
                    newPassword: __VALUE__,
                    oldPassword: __VALUE__
                }`
            }
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
                description: 'Send a forgot password email',
                returns: 'null',
                schema: `{
                    email: __VALUE__
                }`
            }
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
                description: 'Confirm Password using verification code',
                returns: 'null',
                schema: `{
                    newPassword: __VALUE__,
                    verificationCode: __VALUE__
                }`
            }
            /* wwEditor:end */
        },
        {
            name: 'Logout',
            code: 'logout',
            copilot: {
                description: 'Logout user',
                returns: 'null',
                schema: `{}`
            }
        },
    ],
};
