class BoletasDto {
    okTemplate(arg = null) {
        return {
            status: 200,
            data: arg
        };
    }
}

module.exports = {
    BoletasDto
};
