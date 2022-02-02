const jsonData = require("./practical-1.9.json");

const resultArr = jsonData.map( data => ({
    _id: data._id,
    fullName: `${data.firstName} ${data.lastName}`,
    profileImage: data.profileImage,
    highestQualification_PassoutYear: `${data.academicDetails.highestQualification} - ${data.academicDetails.highestQualification_PassoutYear}`,
    emailID: data.contactDetails.primaryEmailID || data.contactDetails.alternateEmailID,
    technologyAssigned: data.technologyAssigned,
    os: (data.systemConfiguration[0].isDualBoot) ? `${data.systemConfiguration[0].os} + ${data.systemConfiguration[0].secondaryOS}` : data.systemConfiguration[0].os
}));

console.log(resultArr);