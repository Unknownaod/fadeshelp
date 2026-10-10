// Tiny helpers for writing article bodies.
// Inline formatting supported inside any text: `code`, **bold**, [label](/path or https://url)

export const p = (v) => ({ t: "p", v });
export const h = (v) => ({ t: "h", v });
export const steps = (v) => ({ t: "steps", v });
export const ul = (v) => ({ t: "ul", v });
export const note = (v) => ({ t: "note", v });
export const warn = (v) => ({ t: "warn", v });
export const code = (v) => ({ t: "code", v });
