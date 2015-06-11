/**
 * ProjectController
 *
 * @description :: Server-side logic for managing projects
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    find: function (req, res) {

        Project.find().populate('accountings').exec(function (err, projects) {
            if (!err) {
                projects = getProjectsWithSumAccounting(projects);
                return res.send(projects);
            }
            else {
                return res.serverError();
            }
        });
    },

    // Override the default GET (one) action
    findOne: function (req, res) {
        // Get project id from the path looking as follows:
        // http://localhost:1337/projects/557990e43659841603d7919a
        var projectId = req.params['id'];

        if (projectId) {
            Project.findOne({ id: projectId }).populate('accountings')
                .exec(function (err, project) {
                    if (!err) {
                        // If project with that id has been found
                        if (project) {
                            var projects = [project];
                            project = getProjectsWithSumAccounting(projects)[0];

                            // Return the project  object
                            return res.send(project);
                        } else {
                            return res.notFound();
                        }
                    } else {
                        return res.serverError();
                    }
                });
        }
    }

};

// Helpers
function getProjectsWithSumAccounting(projects) {

    var projectsArray = [];

    for (var key in projects) {
        var project = projects[key].toJSON();
        var sumIncome = 0;
        var sumExpense = 0;
        var sumAccounting = 0;


        //count incomes and expenses
        for (var key2 in project.accountings) {
            var accounting = project.accountings[key2];
            if(accounting.type == "INCOME"){
                sumIncome += accounting.value;
                sumAccounting += accounting.value;
            }
            else if(accounting.type == "EXPENSE"){
                sumExpense -= accounting.value;
                sumAccounting -= accounting.value;
            }
        }

        var newProject = {};
        newProject.name = project.name;
        newProject.sumIncome = sumIncome;
        newProject.sumExpense = sumExpense;
        newProject.sumAccounting = sumAccounting;
        newProject.createdAt = project.createdAt;
        newProject.updatedAt = project.updatedAt;
        newProject.id = project.id;
        newProject.accountings = project.accountings;
        projectsArray.push(newProject);
    }

    return projectsArray;
}
