define([
    'angularAMD'
], function (angularAMD) {

    angularAMD.factory('targetGroupService', [
        function () {

            var preschoolGroups = ['PRESCHOOL', 'ZERO_FIVE', 'SIX_SEVEN'];
            var level1Groups = ['LEVEL1', 'GRADE1', 'GRADE2', 'GRADE3'];
            var level2Groups = ['LEVEL2', 'GRADE4', 'GRADE5', 'GRADE6'];
            var level3Groups = ['LEVEL3', 'GRADE7', 'GRADE8', 'GRADE9'];
            var secondaryGroups = ['GYMNASIUM'];

            var groups = [
                {
                    label: 'PRESCHOOL',
                    children: ['ZERO_FIVE', 'SIX_SEVEN']
                }, {
                    label: 'LEVEL1',
                    children: ['GRADE1', 'GRADE2', 'GRADE3']
                }, {
                    label: 'LEVEL2',
                    children: ['GRADE4', 'GRADE5', 'GRADE6']
                }, {
                    label: 'LEVEL3',
                    children: ['GRADE7', 'GRADE8', 'GRADE9']
                }, {
                    label: 'GYMNASIUM',
                    children: ['asd']
                },
            ]

            function map(group) {
                return group.map(function (item, index) {
                    return {
                        name: item,
                        parent: index === 0
                    };
                });
            }

            var instance = {

                /**
                 * Get all target groups.
                 */
                getAll: function () {
                    return groups;
                },

                /**
                 * Get all target groups that can be selected under the specified educational context.
                 */
                getByEducationalContext: function (educationalContext) {
                    if (educationalContext.name === 'PRESCHOOLEDUCATION') {
                        return map(preschoolGroups);
                    } else if (educationalContext.name === 'BASICEDUCATION') {
                        return map(level1Groups).concat(map(level2Groups), map(level3Groups));
                    } else if (educationalContext.name === 'SECONDARYEDUCATION') {
                        return map(secondaryGroups);
                    }
                },

                /**
                 * Get all target groups belonging to a label (for example PRESCHOOL or LEVEL1).
                 * If selectedTargetGroup is a single target group and not a label, an array consisting
                 * of only that target group is returned.
                 */
                getByLabel: function (selectedTargetGroup) {
                    var targetGroups = [];

                    switch (selectedTargetGroup) {
                        case 'PRESCHOOL':
                            targetGroups = preschoolGroups.slice();
                            targetGroups.splice(0, 1); // Remove PRESCHOOL label
                            break;
                        case 'LEVEL1':
                            targetGroups = level1Groups.slice();
                            targetGroups.splice(0, 1);
                            break;
                        case 'LEVEL2':
                            targetGroups = level2Groups.slice();
                            targetGroups.splice(0, 1);
                            break;
                        case 'LEVEL3':
                            targetGroups = level3Groups.slice();
                            targetGroups.splice(0, 1);
                            break;
                        default:
                            targetGroups = [];
                            targetGroups.push(selectedTargetGroup);
                            break;
                    }

                    return targetGroups;
                },

                /**
                 * Get the label that represents all the selected target groups.
                 * If targetGroups contains only one target group, that target group is returned.
                 * @param targetGroups  array of target groups
                 */
                getLabelByTargetGroups: function (targetGroups) {
                    var selectedTargetGroup = null;

                    // Refactor

                    if (targetGroups) {
                        if (targetGroups.length === 1) {
                            selectedTargetGroup = targetGroups[0];
                        } else if (targetGroups.length === 2) {
                            if (targetGroups.indexOf('ZERO_FIVE') > -1 &&
                                targetGroups.indexOf('SIX_SEVEN') > -1) {
                                selectedTargetGroup = 'PRESCHOOL';
                            }
                        } else if (targetGroups.length === 3) {
                            if (targetGroups.indexOf('GRADE1') > -1 &&
                                targetGroups.indexOf('GRADE2') > -1 &&
                                targetGroups.indexOf('GRADE3') > -1) {
                                selectedTargetGroup = 'LEVEL1';
                            }

                            if (targetGroups.indexOf('GRADE4') > -1 &&
                                targetGroups.indexOf('GRADE5') > -1 &&
                                targetGroups.indexOf('GRADE6') > -1) {
                                selectedTargetGroup = 'LEVEL2';
                            }

                            if (targetGroups.indexOf('GRADE7') > -1 &&
                                targetGroups.indexOf('GRADE8') > -1 &&
                                targetGroups.indexOf('GRADE9') > -1) {
                                selectedTargetGroup = 'LEVEL3';
                            }
                        } else if (targetGroups.length > 3) {
                            //TODO: If more than one target group show multiple selected groups
                            selectedTargetGroup = 'LEVEL2';
                        }
                    }

                    return selectedTargetGroup;
                },

                /**
                 * Get the label that represents all the selected target groups.
                 * If there is no such label, return all target groups.
                 */
                getLabelByTargetGroupsOrAll: function (targetGroups) {
                    if (!targetGroups) {
                        return [];
                    }

                    var label = this.getLabelByTargetGroups(targetGroups);

                    if (label) {
                        return [label];
                    } else {
                        return targetGroups;
                    }
                },

                areGroupElementsInArray: function (array, list) {
                    var i = 0;
                    var j = 0;

                    for (i; i < list.length; i++) {
                        if (array.indexOf(list[i]) != -1) {
                            j++;
                        }
                    }

                    if (i == j) {
                        return true;
                    } else {
                        return false;
                    }
                },

                getGroups: function () {
                    return groups;
                },

                isParent: function (item) {
                    if (item !== null) {
                        for(var i = 0; i < groups.length; i++) {
                            if (item == groups[i].label) {
                                return true;
                            }
                        }
                    }

                    return false;
                },

                getAllChildren: function(data) {
                    debugger;
                    for (i = 0; i < groups.length; i++) {
                        var index = data.indexOf(groups[i].label);
                        if(index != -1) {
                            data.splice(index, 1);
                        }
                    }
                    return data;
                }
            };

            return instance;
        }
    ]);
});
