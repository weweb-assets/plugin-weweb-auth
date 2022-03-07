import { CognitoUserPool, CognitoUser, AuthenticationDetails, CookieStorage } from 'amazon-cognito-identity-js';
/* wwEditor:start */
import './components/Functions/Login.vue';
import './components/Functions/SignUp.vue';
/* wwEditor:end */

const ACCESS_COOKIE_NAME = 'ww-auth-access-token';
const REFRESH_COOKIE_NAME = 'ww-auth-refresh-token';

export default {
    /*=============================================m_ÔÔ_m=============================================\
        Plugin API
    \================================================================================================*/
    cognitoUserPool: null,
    cognitoUser: null,
    async onLoad() {
        this.cognitoUserPool = new CognitoUserPool({
            ClientId: this.settings.publicData.clientId || 'pjvp5a6rmui7t11eqbfjrsmlq',
            UserPoolId: this.settings.publicData.userPoolId || 'us-east-1_LFXlGRVHi',
        });
        this.cognitoUser = this.cognitoUserPool.getCurrentUser();

        if (this.cognitoUser) await this.fetchUser();
    },
    /*=============================================m_ÔÔ_m=============================================\
        Auth API
    \================================================================================================*/
    /* wwEditor:start */
    // async getRoles() {},
    userAttributes: [
        { label: 'Given name', key: 'given_name' },
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
    async getUsers() {
        const websiteId = wwLib.wwWebsiteData.getInfo().id;
        const response = await axios.get(`${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users`, {
            headers: wwLib.wwApiRequests._getAuthHeader(),
        });

        return response.data;
    },
    async importUsers(users) {
        for (const user of users) {
            await this.createUser(user);
        }
    },
    async createUser(data) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            const { data: user } = await axios.post(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users`,
                data,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
            return user;
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async updateUser(user, data) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}`,
                data,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async resetUserPassword(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.patch(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/password/reset`,
                {},
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async blockUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/block`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async unblockUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}/unblock`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    async deleteUser(user) {
        try {
            const websiteId = wwLib.wwWebsiteData.getInfo().id;
            await axios.delete(
                `${wwLib.wwApiRequests._getPluginsUrl()}/designs/${websiteId}/ww-auth/users/${user.id}`,
                { headers: wwLib.wwApiRequests._getAuthHeader() }
            );
        } catch (err) {
            if (err.response && err.response.data.message) throw new Error(err.response.data.message);
            throw err;
        }
    },
    /* wwEditor:end */
    /*=============================================m_ÔÔ_m=============================================\
        WeWeb Auth API
    \================================================================================================*/
    storeToken(accessToken, refreshToken) {
        if (accessToken) {
            window.vm.config.globalProperties.$cookie.setCookie(ACCESS_COOKIE_NAME, accessToken);
            wwLib.wwVariable.updateValue(`${this.id}-accessToken`, accessToken);
        }
        if (refreshToken) {
            window.vm.config.globalProperties.$cookie.setCookie(REFRESH_COOKIE_NAME, refreshToken);
            wwLib.wwVariable.updateValue(`${this.id}-refreshToken`, refreshToken);
        }
    },
    removeToken() {
        window.vm.config.globalProperties.$cookie.removeCookie(ACCESS_COOKIE_NAME);
        wwLib.wwVariable.updateValue(`${this.id}-accessToken`, null);
        window.vm.config.globalProperties.$cookie.removeCookie(REFRESH_COOKIE_NAME);
        wwLib.wwVariable.updateValue(`${this.id}-refreshToken`, null);
    },
    async fetchUser() {
        try {
            const awsUser = await new Promise((resolve, reject) =>
                this.cognitoUser.getUserData((err, data) => (err ? reject(err) : resolve(data)))
            );
            const user = {
                ...awsUser.UserAttributes.reduce(
                    (obj, attribute) => ({ ...obj, [attribute.Name]: attribute.Value }),
                    {}
                ),
                id: awsUser.Username,
                sub: undefined,
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
            this.cognitoUser = new CognitoUser({ Username: email, Pool: this.cognitoUserPool });
            const storage = new CookieStorage({ domain: window.location.hostname, secure: false });

            const { accessToken } = await new Promise((resolve, reject) =>
                this.cognitoUser.authenticateUser(
                    new AuthenticationDetails({ Username: email, Password: password, Storage: storage }),
                    {
                        onSuccess: data => resolve({ accessToken: data.getAccessToken().getJwtToken() }),
                        onFailure: err => reject(err),
                    }
                )
            );
            this.storeToken(accessToken);
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
    logout() {
        this.removeToken();
        wwLib.wwVariable.updateValue(`${this.id}-user`, null);
        wwLib.wwVariable.updateValue(`${this.id}-isAuthenticated`, false);
        this.cognitoUser.signOut();
    },
};
