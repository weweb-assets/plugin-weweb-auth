import { CognitoUserPool, CognitoUser, AuthenticationDetails, CookieStorage } from 'amazon-cognito-identity-js';
/* wwEditor:start */
import './components/Configuration/SettingsEdit.vue';
import './components/Configuration/SettingsSummary.vue';
import './components/Redirections/SettingsEdit.vue';
import './components/Redirections/SettingsSummary.vue';
import './components/Functions/Login.vue';
import './components/Functions/SignUp.vue';
import './components/Functions/UpdateUserProfile.vue';
import './components/Functions/ChangePassword.vue';
import './components/Functions/ConfirmPassword.vue';
import './components/Functions/ForgotPassword.vue';
/* wwEditor:end */

const ACCESS_COOKIE_NAME = 'ww-auth-access-token';
const REFRESH_COOKIE_NAME = 'ww-auth-refresh-token';

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    websiteId: null,
    cognitoUserPool: null,
    cognitoUser: null,
    cognitoStorage: null,
    async onLoad() {
        this.websiteId = wwLib.wwWebsiteData.getInfo().id;
        this.cognitoStorage = new CookieStorage({ domain: window.location.hostname });
        this.cognitoUserPool = new CognitoUserPool({
            ClientId: this.settings.publicData.clientId,
            UserPoolId: this.settings.publicData.userPoolId,
            Storage: this.cognitoStorage,
        });
        this.cognitoUser = this.cognitoUserPool.getCurrentUser();
        if (this.cognitoUser) await this.fetchUser();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    /* Users */
    userAttributes: [
        { label: 'Picture', key: 'picture' },
        { label: 'Given name', key: 'gisven_name' },
        { label: 'Family name', key: 'family_name' },
        { label: 'Middle name', key: 'middle_name' },
        { label: 'Nickname', key: 'nickname' },
        { label: 'Profile URL', key: 'profile' },
        { label: 'Website URL', key: 'website' },
        { label: 'Gender', key: 'gender' },
        { label: 'Birthdate', key: 'birthdate' },
        { label: 'Zoneinfo', key: 'zoneinfo' },
        { label: 'Locale', key: 'locale' },
        { label: 'Address', key: 'address' },
        { label: 'Phone number', key: 'phone_number' },
    ],
    async adminGetUsers() {
        const response = await axios.get(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );

        return response.data;
    },
    async adminCreateUser(data, isInvitation) {
        try {
            const { data: user } = await axios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users`,
                { ...data, isInvitation },
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
            return user;
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminUpdateUser(user, data) {
        try {
            const { data: userUpdated } = await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}`,
                data,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
            return userUpdated;
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminUpdateUserPassword(user, password) {
        try {
            await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/password`,
                { password },
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminUpdateUserRoles(user, roles) {
        try {
            await axios.put(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/roles`,
                { roles },
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminBlockUser(user) {
        try {
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/block`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminUnblockUser(user) {
        try {
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}/unblock`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminDeleteUser(user) {
        try {
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${user.id}`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async adminImportUsers(users, isInvitation) {
        for (const user of users) {
            try {
                await this.adminCreateUser(
                    { email: user.email, name: user.name, password: user.password, attributes: [] },
                    isInvitation
                );
            } catch (err) {
                wwLib.wwLog.error(err);
                wwLib.wwNotification.open({ text: err.message, color: 'red' });
            }
        }
    },
    adminExportUsers(users) {
        const titles = [...new Set(users.map(user => Object.keys(user)).flat())];
        return [titles, ...users.map(user => titles.map(title => user[title]))];
    },
    /* Roles */
    async adminGetRoles() {
        const { data } = await axios.get(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );

        return data;
    },
    async adminCreateRole(name) {
        const { data } = await axios.post(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles`,
            { name },
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );

        return data;
    },
    async adminUpdateRole(roleId, name) {
        const { data } = await axios.patch(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles/${roleId}`,
            { name },
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );

        return data;
    },
    async adminDeleteRole(roleId) {
        await axios.delete(
            `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/roles/${roleId}`,
            { headers: wwLib.wwApiRequests._getAuthHeader() }
        );
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        WeWeb Auth API
    \================================================================================================*/
    storeToken(accessToken, refreshToken) {
        if (accessToken) {
            window.vm.config.globalProperties.$cookie.setCookie(ACCESS_COOKIE_NAME, accessToken);
        }
        if (refreshToken) {
            window.vm.config.globalProperties.$cookie.setCookie(REFRESH_COOKIE_NAME, refreshToken);
        }
    },
    removeToken() {
        window.vm.config.globalProperties.$cookie.removeCookie(ACCESS_COOKIE_NAME);
        window.vm.config.globalProperties.$cookie.removeCookie(REFRESH_COOKIE_NAME);
    },
    async fetchUser() {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUser.getSession((err, data) => (err ? reject(err) : resolve(data)))
            );
            const awsUser = await new Promise((resolve, reject) =>
                this.cognitoUser.getUserData((err, data) => (err ? reject(err) : resolve(data)))
            );
            const { data: roles } = await axios.get(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${
                    awsUser.Username
                }/roles`,
                {
                    withCredentials: true,
                    headers: {
                        Cookie: `${ACCESS_COOKIE_NAME}=${window.vm.config.globalProperties.$cookie.getCookie(
                            ACCESS_COOKIE_NAME
                        )}; ${REFRESH_COOKIE_NAME}=${window.vm.config.globalProperties.$cookie.getCookie(
                            REFRESH_COOKIE_NAME
                        )}`,
                    },
                }
            );

            const user = {
                ...awsUser.UserAttributes.reduce(
                    (obj, attribute) => ({ ...obj, [attribute.Name]: attribute.Value }),
                    {}
                ),
                id: awsUser.Username,
                sub: undefined,
                roles,
            };

            wwLib.wwVariable.updateValue(`${this.id}-user`, user);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, true);
            return user;
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async login(email, password) {
        try {
            this.cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.cognitoUserPool,
                Storage: this.cognitoStorage,
            });

            const data = await new Promise((resolve, reject) =>
                this.cognitoUser.authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                    onSuccess: data => resolve(data),
                    onFailure: err => reject(err),
                })
            );
            const accessToken = data.accessToken.jwtToken;
            const refreshToken = data.refreshToken.token;
            this.storeToken(accessToken, refreshToken);
            return await this.fetchUser();
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async signUp(email, password, name) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUserPool.signUp(email, password, [{ Name: 'name', Value: name }], null, (err, data) =>
                    err ? reject(err) : resolve(data)
                )
            );
            return await this.login(email, password);
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async updateUserProfile(email, name, attributes) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUser.updateAttributes(
                    [
                        { Name: 'email', Value: email || '' },
                        { Name: 'name', Value: name || '' },
                        ...(attributes || []).map(attribute => ({ Name: attribute.key, Value: attribute.value || '' })),
                    ],
                    (err, data) => (err ? reject(err) : resolve(data))
                )
            );
            return await this.fetchUser();
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async changePassword(oldPassword, newPassword) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUser.changePassword(oldPassword, newPassword, (err, data) =>
                    err ? reject(err) : resolve(data)
                )
            );
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async forgotPassword(email) {
        this.cognitoUser = new CognitoUser({
            Username: email,
            Pool: this.cognitoUserPool,
            Storage: this.cognitoStorage,
        });
        await new Promise((resolve, reject) =>
            this.cognitoUser.forgotPassword({
                onSuccess: data => resolve(data),
                onFailure: err => reject(err),
                inputVerificationCode: data => resolve(data),
            })
        );
    },
    async confirmPassword(verificationCode, newPassword) {
        await new Promise((resolve, reject) =>
            this.cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: () => resolve(),
                onFailure: err => reject(err),
            })
        );
    },
    logout() {
        this.removeToken();
        wwLib.wwVariable.updateValue(`${this.id}-user`, null);
        wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
        this.cognitoUser.signOut();
    },
};
