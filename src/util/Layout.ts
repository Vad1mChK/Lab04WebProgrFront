enum Layout {
    MOBILE,
    TABLET,
    DESKTOP
}

export default Layout

export function determineLayout(width: number): Layout {
    if (width < 668) {
        return Layout.MOBILE
    } else if (width < 1195) {
        return Layout.TABLET
    } else {
        return Layout.DESKTOP
    }
}