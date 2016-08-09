module curly {
	export interface HoverStyleDeclaration extends StyleDeclaration {
		backgroundColorHover?: string;
		colorHover?: string;
		durationIn?: number;
		durationOut?: number;
	}
}