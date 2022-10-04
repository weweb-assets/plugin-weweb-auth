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

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    websiteId: null,
    cognitoUserPool: null,
    cognitoUser: null,
    cognitoStorage: null,
    async onLoad(settings) {
        this.websiteId = wwLib.wwWebsiteData.getInfo().id;
        this.cognitoStorage = new CookieStorage({
            domain: window.location.hostname,
            path: wwLib.manager ? `/${this.websiteId}` : '/',
        });
        this.cognitoUserPool = new CognitoUserPool({
            ClientId: settings.publicData.clientId,
            UserPoolId: settings.publicData.userPoolId,
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
    async fetchUser() {
        try {
            const accessToken = await new Promise((resolve, reject) =>
                this.cognitoUser.getSession((err, data) => (err ? reject(err) : resolve(data.accessToken.jwtToken)))
            );
            const awsUser = await new Promise((resolve, reject) =>
                this.cognitoUser.getUserData((err, data) => (err ? reject(err) : resolve(data)))
            );
            const { data: roles } = await axios.get(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${this.websiteId}/ww-auth/users/${
                    awsUser.Username
                }/roles`,
                { headers: { 'ww-auth-access-token': accessToken } }
            );

            const user = {
                ...awsUser.UserAttributes.reduce(
                    (obj, attribute) => ({ ...obj, [attribute.Name]: attribute.Value }),
                    {}
                ),
                id: awsUser.Username,
                roles,
            };
            delete user.sub;

            wwLib.wwVariable.updateValue(`${this.id}-user`, user);
            wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, true);
            return user;
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async login({ email, password }) {
        try {
            if (this.cognitoUser) this.logout();
            this.cognitoUser = new CognitoUser({
                Username: email,
                Pool: this.cognitoUserPool,
                Storage: this.cognitoStorage,
            });

            await new Promise((resolve, reject) =>
                this.cognitoUser.authenticateUser(new AuthenticationDetails({ Username: email, Password: password }), {
                    onSuccess: data => resolve(data),
                    onFailure: err => reject(err),
                })
            );
            return await this.fetchUser();
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async signUp({ email, password, name }) {
        try {
            await new Promise((resolve, reject) =>
                this.cognitoUserPool.signUp(email, password, [{ Name: 'name', Value: name }], null, (err, data) =>
                    err ? reject(err) : resolve(data)
                )
            );
            return await this.login({ email, password });
        } catch (err) {
            this.logout();
            throw err;
        }
    },
    async updateUserProfile({ email, name, attributes }) {
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
    async changePassword({ oldPassword, newPassword }) {
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
    async forgotPassword({ email }) {
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
    async confirmPassword({ verificationCode, newPassword }) {
        await new Promise((resolve, reject) =>
            this.cognitoUser.confirmPassword(verificationCode, newPassword, {
                onSuccess: () => resolve(),
                onFailure: err => reject(err),
            })
        );
    },
    logout() {
        wwLib.wwVariable.updateValue(`${this.id}-user`, null);
        wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
        if (this.cognitoUser) this.cognitoUser.signOut();
    },
};
