function createRgba(r: number,g: number, b: number){
    
    function rgba(a: number = 1){
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }
    return rgba
}

const Colors = {
    lightPurple: createRgba(224, 187, 228),
    lavender: createRgba(149, 125, 173),
    violet: createRgba(210, 145, 188),
    lightPink: createRgba(254, 200, 216),
    lightSkin: createRgba(255, 223, 211),
    opal: createRgba(177, 197, 195),
    latte: createRgba(233, 226, 215),
    sand: createRgba(225, 184, 148),
    milkChocolate: createRgba(135, 92, 54),
    brown: createRgba(112, 69, 35),
}
export default Colors

