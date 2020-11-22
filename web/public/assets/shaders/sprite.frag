
uniform sampler2D spritesheet;
uniform vec2 srcPos, srcSize;
uniform vec2 dstPos, dstSize;

varying vec2 v_uv;

void main() {

//    float sizeRatio = dstSize / srcSize;

    vec2 uv = v_uv * dstSize + srcPos - dstPos;
    vec2 mask = (v_uv - dstPos / dstSize) * dstSize / srcSize;

    if (mask.x >= 0.0 && mask.x <= 1.0 && mask.y >= 0.0 && mask.y <= 1.0)
        gl_FragColor = texture2D(spritesheet, uv);
    else
        gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}
