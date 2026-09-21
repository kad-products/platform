export default {
	plugins: ['prettier-plugin-packagejson'],
	overrides: [
		{
			files: 'package.json',
			options: {
				tabWidth: 4,
				useTabs: true,
			},
		},
	],
};
