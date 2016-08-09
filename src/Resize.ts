module curly {
    export class Resize {

        static proportionalOutside(
            objectWidth: number,
            objectHeight:number,
            areaWidth: number,
            areaHeight: number)
        {
            var ratio: number = objectWidth / objectHeight;
            var targetWidth: number = areaWidth;
            var targetHeight: number = areaWidth / ratio;

//

            if (targetHeight < areaHeight) {
                targetHeight = areaHeight;
                targetWidth = targetHeight * ratio;
            }

            return { height: targetHeight, width: targetWidth };
        }

        static proportionalInside(
            objectWidth: number,
            objectHeight: number,
            areaWidth: number,
            areaHeight: number):Object {
            var ratio: number = objectWidth / objectHeight;
            var targetWidth: number = areaWidth;
            var targetHeight: number = areaWidth * ratio;



            if (targetHeight > areaHeight) {
                targetHeight = areaHeight;
                targetWidth = targetHeight * ratio;
            }

            return { height: targetHeight, width: targetWidth };
        }
    }
}