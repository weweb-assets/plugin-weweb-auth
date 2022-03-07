<template>
    <wwEditorInputRow
        label="Email"
        type="query"
        :model-value="email"
        bindable
        placeholder="Enter a email"
        @update:modelValue="setEmail"
    />
    <wwEditorInputRow
        label="Name"
        type="query"
        :model-value="name"
        bindable
        placeholder="Enter a name"
        @update:modelValue="setName"
    />
    <wwEditorInputRow
        label="Picture"
        type="query"
        :model-value="picture"
        bindable
        placeholder="Enter a picture URL"
        @update:modelValue="setPicture"
    />
    <wwEditorInputRow
        label="Custom attributes"
        type="array"
        :model-value="attributes"
        bindable
        @update:modelValue="setAttributes"
        @add-item="setAttributes([...attributes, { type: 'string' }])"
    >
        <template #default="{ item, setItem }">
            <wwEditorInputRow
                :model-value="item.key"
                type="select"
                :options="userAttributesOptions"
                small
                placeholder="Select an attribute"
                @update:model-value="setItem({ ...item, key: $event })"
            />
            <wwEditorInputRow
                :model-value="item.value"
                type="query"
                small
                placeholder="Enter a value"
                @update:model-value="setItem({ ...item, value: $event })"
            />
        </template>
    </wwEditorInputRow>
</template>

<script>
export default {
    props: {
        plugin: { type: Object, required: true },
        args: { type: Array, default: () => [null, null, null, []] },
    },
    emits: ['update:args'],
    computed: {
        email() {
            return this.args[0];
        },
        name() {
            return this.args[1];
        },
        picture() {
            return this.args[2];
        },
        attributes() {
            return this.args[3];
        },
        userAttributesOptions() {
            return this.plugin.userAttributes.map(attribute => ({
                label: attribute.label,
                value: attribute.key,
            }));
        },
    },
    methods: {
        setEmail(email) {
            this.$emit('update:args', [email, this.name, this.picture, this.attributes]);
        },
        setName(name) {
            this.$emit('update:args', [this.email, name, this.picture, this.attributes]);
        },
        setPicture(picture) {
            this.$emit('update:args', [this.email, this.name, picture, this.attributes]);
        },
        setAttributes(attributes) {
            this.$emit('update:args', [this.email, this.name, this.picture, attributes]);
        },
    },
};
</script>
