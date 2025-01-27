function useBasename(initialValue) {
    const basename = process.env.REACT_APP_BASENAME || "/";

    return basename;
}

export default useBasename;