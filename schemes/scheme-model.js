const db = require("../data/config");

function find() {
    return db("schemes");
};

function findById(id) {
    return db("schemes")
        .where({ id })
        .limit(1);
};

// ?????
function findSteps(id) {
    return db("schemes")
        .select("*", "scheme_name")
        .from("steps as st")
        .where("scheme_id")
        .join("schemes as sch", "st.scheme_id", "sch.id")
        .orderBy("st.step_number");
};

function add(scheme) {
    return db("schemes")
        .insert(scheme)
        .then((id) => {
            const id = scheme
            return findById(id);
        });
};

function update(changes, id) {
    return db("schemes")
        .where({ id })
        .update(changes);
};

function remove(id) {
    return db("schemes")
        .where({ id })
        .delete();
};

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};