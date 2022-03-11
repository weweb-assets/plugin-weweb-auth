<template>
    <wwEditorInputRow
        label="Verification Code"
        type="query"
        :model-value="verificationCode"
        bindable
        required
        placeholder="Enter the verification code"
        @update:modelValue="setVerificationCode"
    />
    <wwEditorInputRow
        label="New Password"
        type="query"
        :model-value="newPassword"
        bindable
        required
        placeholder="Enter the new password"
        @update:modelValue="setNewPassword"
    />
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Array, default: () => [null, null] },
    },
    emits: ['update:args'],
    computed: {
        verificationCode() {
            return this.args[0];
        },
        newPassword() {
            return this.args[1];
        },
    },
    methods: {
        setVerificationCode(verificationCode) {
            this.$emit('update:args', [verificationCode, this.newPassword]);
        },
        setNewPassword(newPassword) {
            this.$emit('update:args', [this.verificationCode, newPassword]);
        },
    },
};
</script>
