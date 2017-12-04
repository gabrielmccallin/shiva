var Resize = (function () {
    function Resize() {
    }
    Resize.proportionalOutside = function (source, target) {
        var ratio = source.width / source.height;
        var targetWidth = target.width;
        var targetHeight = target.width / ratio;
        if (targetHeight < target.height) {
            targetHeight = target.height;
            targetWidth = targetHeight * ratio;
        }
        return { height: targetHeight, width: targetWidth };
    };
    Resize.proportionalInside = function (source, target) {
        var ratio = source.width / source.height;
        var targetWidth = target.width;
        var targetHeight = target.width * ratio;
        if (targetHeight > target.height) {
            targetHeight = target.height;
            targetWidth = targetHeight * ratio;
        }
        return { height: targetHeight, width: targetWidth };
    };
    return Resize;
}());
export { Resize };
