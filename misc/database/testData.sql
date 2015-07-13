-- Those should be in separate files with complete data

-- EducationalContext

insert into EducationalContext(id, educationalContext) values (1001, 'PRESCHOOL');
insert into EducationalContext(id, educationalContext) values (1002, 'COMPULSORYEDUCATION');
insert into EducationalContext(id, educationalContext) values (1003, 'VOCATIONALEDUCATION');
insert into EducationalContext(id, educationalContext) values (1004, 'HIGHEREDUCATION');
insert into EducationalContext(id, educationalContext) values (1005, 'CONTINUINGEDUCATION');
insert into EducationalContext(id, educationalContext) values (1006, 'PROFESSIONALDEVELOPMENT');
insert into EducationalContext(id, educationalContext) values (1007, 'SPECIALEDUCATION');
insert into EducationalContext(id, educationalContext) values (1008, 'OTHER');

-- Classifications

insert into Classification(id, classificationName, parent) values (1, 'Biology', null);
insert into Classification(id, classificationName, parent) values(2, 'Plants', 1);
insert into Classification(id, classificationName, parent) values(3, 'Trees', 2);
insert into Classification(id, classificationName, parent) values (4, 'Mathematics', null);
insert into Classification(id, classificationName, parent) values(5, 'Algebra', 4);
insert into Classification(id, classificationName, parent) values(6, 'Linear', 5);
insert into Classification(id, classificationName, parent) values(7, 'Quadratic', 5);

-- Translation for Classifications. It must be in the translation files when we have the final Classification tree

insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_BIOLOGY', 'Bioloogia');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_PLANTS', 'Taimed');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_TREES', 'Puud');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_MATHEMATICS', 'Matemaatika');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_ALGEBRA', 'Algebra');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_LINEAR', 'Sirgjooneline');
insert into Translation(translationGroup, translationKey, translation) values (1, 'CLASSIFICATION_QUADRATIC', 'Quadratic');

insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_BIOLOGY', 'биология');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_PLANTS', 'растения');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_TREES', 'деревья');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_MATHEMATICS', 'математический');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_ALGEBRA', 'алгебра');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_LINEAR', 'линейный');
insert into Translation(translationGroup, translationKey, translation) values (2, 'CLASSIFICATION_QUADRATIC', 'квадратный');

insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_BIOLOGY', 'Biology');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_PLANTS', 'Plants');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_TREES', 'Trees');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_MATH', 'Math');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_ALGEBRA', 'Algebra');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_LINEAR', 'Linear');
insert into Translation(translationGroup, translationKey, translation) values (3, 'CLASSIFICATION_QUADRATIC', 'Quadratic');



-- Start of test data

-- IssueDate

insert into IssueDate(id, day, month, year) values(1, 2, 2, 1983);
insert into IssueDate(id, day, month, year) values(2, 27, 1, -983);
insert into IssueDate(id, year) values(3, -1500);
insert into IssueDate(id, day, month, year) values(4, 31, 3, 1923);
insert into IssueDate(id, day, month, year) values(5, 9, 12, 1978);
insert into IssueDate(id, day, month, year) values(6, 27, 1, 1986);
insert into IssueDate(id, month, year) values(7, 3, 1991);

-- Materials

insert into Material(id, lang, issueDate, licenseType, source, added) values(1, 1, 1, 1, 'https://www.youtube.com/watch?v=gSWbx3CvVUk', '1999-02-02 06:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(2, 2, 2, 2, 'https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes', '1992-02-03 06:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(3, 4, 3, 3,  'http://eloquentjavascript.net/Eloquent_JavaScript.pdf', '2009-02-17 08:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(4, 3, 4, 1,  'https://en.wikipedia.org/wiki/Power_Architecture', '2012-02-02 09:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(5, 3, 5, 2,  'https://en.wikipedia.org/wiki/Power_Architecture', '2011-09-15 08:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(6, null, null, null, 'http://www.planalto.gov.br/ccivil_03/Constituicao/Constituicao.htm', '1971-09-22 08:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(7, 4, 6, 3, 'https://president.ee/en/republic-of-estonia/the-constitution/index.html', '2001-07-16 06:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(9, null, null, null, 'http://EmptyFileds.test.ee', '2015-06-08 08:00:01');
insert into Material(id, lang, issueDate, licenseType, source, added) values(10, 1, 2, 3, 'http://automated.test.ee', '2015-06-09 08:00:01');

-- Authors

insert into Author(id, name, surname) values(1, 'Isaac', 'John Newton');
insert into Author(id, name, surname) values(2, 'Karl Simon Ben', 'Tom Oliver Marx');
insert into Author(id, name, surname) values(3, 'Leonardo', 'Fibonacci');
insert into Author(id, name, surname) values(4, 'Automated', 'Automated');

-- Material_Authors

insert into Material_Author(material, author) values(1, 1);
insert into Material_Author(material, author) values(2, 1);
insert into Material_Author(material, author) values(2, 3);
insert into Material_Author(material, author) values(3, 1);
insert into Material_Author(material, author) values(4, 1);
insert into Material_Author(material, author) values(5, 3);
insert into Material_Author(material, author) values(6, 3);
insert into Material_Author(material, author) values(7, 3);
insert into Material_Author(material, author) values(8, 2);
insert into Material_Author(material, author) values(10, 4);

-- Material Descriptions

insert into LanguageString(id, lang, textValue) values (1, 1, 'Test description in estonian. (Russian available)');
insert into LanguageString(id, lang, textValue) values (2, 2, 'Test description in russian, which is the only language available.');
insert into LanguageString(id, lang, textValue) values (3, 2, 'Test description in russian. (Estonian available)');
insert into LanguageString(id, lang, textValue) values (4, 5, 'Test description in portugese, as the material language (english) not available.');
insert into LanguageString(id, lang, textValue) values (5, 4, 'Test description in arabic (material language). No estonian or russian available.');
insert into LanguageString(id, lang, textValue) values (6, 3, 'Test description in english, which is the material language.');
insert into LanguageString(id, lang, textValue) values (7, 3, 'Test description in english, which is not the material language. Others are also available, but arent estonian or russian.');
insert into LanguageString(id, lang, textValue) values (8, 5, 'Test description in portugese, english also available.');
insert into LanguageString(id, lang, textValue) values (19, 1, 'Automated test resource description. DO NOT TOUCH!!!! material language Estonian, Description Estonian');


insert into Material_Description(description, material) values(1, 1);
insert into Material_Description(description, material) values(2, 2);
insert into Material_Description(description, material) values(3, 1);
insert into Material_Description(description, material) values(4, 4);
insert into Material_Description(description, material) values(5, 3);
insert into Material_Description(description, material) values(6, 5);
insert into Material_Description(description, material) values(7, 7);
insert into Material_Description(description, material) values(8, 7);
insert into Material_Description(description, material) values(19, 10);

-- Material Titles

insert into LanguageString(id, lang, textValue) values (9, 1, 'Matemaatika õpik üheksandale klassile');
insert into LanguageString(id, lang, textValue) values (10, 2, 'Математика учебник для 9-го класса');
insert into LanguageString(id, lang, textValue) values (11, 2, 'Математика учебник для 8-го класса');
insert into LanguageString(id, lang, textValue) values (12, 5, 'Test title in portugese: manual de instruções, as the material language (english) not available.');
insert into LanguageString(id, lang, textValue) values (13, 4, 'الرياضيات الكتب المدرسية للصف 7');
insert into LanguageString(id, lang, textValue) values (14, 3, 'The Capital.');
insert into LanguageString(id, lang, textValue) values (15, 3, 'Test title in english, which is not the material language. Others are also available, but arent estonian or russian.');
insert into LanguageString(id, lang, textValue) values (16, 5, 'Test title in portugese, english also available.');
insert into LanguageString(id, lang, textValue) values (17, 1, 'Eesti keele õpik üheksandale klassile');
insert into LanguageString(id, lang, textValue) values (18, 1, 'Aabits 123');
insert into LanguageString(id, lang, textValue) values (20, 1, 'Automated test resource title. DO NOT TOUCH!!! Title in estonian');


insert into Material_Title(title, material) values(9, 1);
insert into Material_Title(title, material) values(10, 1);
insert into Material_Title(title, material) values(11, 2);
insert into Material_Title(title, material) values(12, 4);
insert into Material_Title(title, material) values(13, 3);
insert into Material_Title(title, material) values(14, 5);
insert into Material_Title(title, material) values(15, 7);
insert into Material_Title(title, material) values(16, 7);
insert into Material_Title(title, material) values(17, 6);
insert into Material_Title(title, material) values(18, 8);
insert into Material_Title(title, material) values(20, 10);

-- Material classifications

insert into Material_Classification(classification, material) values(1,1);
insert into Material_Classification(classification, material) values(2,1);
insert into Material_Classification(classification, material) values(2,2);
insert into Material_Classification(classification, material) values(1,3);
insert into Material_Classification(classification, material) values(1,4);
insert into Material_Classification(classification, material) values(5,4);
insert into Material_Classification(classification, material) values(7,5);
insert into Material_Classification(classification, material) values(4,10);

-- Material_ResourceType

insert into Material_ResourceType(material, resourceType) values (1, 1);
insert into Material_ResourceType(material, resourceType) values (1, 2);
insert into Material_ResourceType(material, resourceType) values (2, 3);
insert into Material_ResourceType(material, resourceType) values (3, 4);
insert into Material_ResourceType(material, resourceType) values (4, 5);
insert into Material_ResourceType(material, resourceType) values (5, 3);
insert into Material_ResourceType(material, resourceType) values (6, 2);
insert into Material_ResourceType(material, resourceType) values (7, 4);
insert into Material_ResourceType(material, resourceType) values (10, 1);

-- Material_EducationalContext

insert into Material_EducationalContext(material, educationalContext) values (1, 1001);
insert into Material_EducationalContext(material, educationalContext) values (1, 1002);
insert into Material_EducationalContext(material, educationalContext) values (2, 1003);
insert into Material_EducationalContext(material, educationalContext) values (3, 1004);
insert into Material_EducationalContext(material, educationalContext) values (4, 1005);
insert into Material_EducationalContext(material, educationalContext) values (5, 1003);
insert into Material_EducationalContext(material, educationalContext) values (6, 1002);
insert into Material_EducationalContext(material, educationalContext) values (7, 1004);
insert into Material_EducationalContext(material, educationalContext) values (10, 1001);

-- Publishers

insert into Publisher(id, name, website) values (1, 'Koolibri', 'http://www.koolibri.ee');
insert into Publisher(id, name, website) values (2, 'Pegasus', 'http://www.pegasus.ee');
insert into Publisher(id, name, website) values (3, 'Varrak', 'http://www.varrak.ee');

-- MaterialPublisher

insert into Material_Publisher(material, publisher) values (1, 1);
insert into Material_Publisher(material, publisher) values (1, 2);
insert into Material_Publisher(material, publisher) values (2, 2);
insert into Material_Publisher(material, publisher) values (3, 3);
insert into Material_Publisher(material, publisher) values (10, 2);
