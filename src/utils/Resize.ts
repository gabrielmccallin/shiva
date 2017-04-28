module shiva {
    export interface Dimension {
        width: number,
        height: number
    }

    export class Resize {
        

        static proportionalOutside(source: Dimension, target: Dimension) 
        {
            var ratio: number = source.width / source.height;
            var targetWidth: number = target.width;
            var targetHeight: number = target.width / ratio;

            if (targetHeight < target.height) {
                targetHeight = target.height;
                targetWidth = targetHeight * ratio;
            }

            return { height: targetHeight, width: targetWidth };
        }

        static proportionalInside(source: Dimension, target: Dimension) :Object 
        {
            var ratio: number = source.width / source.height;
            var targetWidth: number = target.width;
            var targetHeight: number = target.width * ratio;

            if (targetHeight > target.height) {
                targetHeight = target.height;
                targetWidth = targetHeight * ratio;
            }

            return { height: targetHeight, width: targetWidth };
        }
    }
}