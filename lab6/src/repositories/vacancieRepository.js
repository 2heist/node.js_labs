const { Vacancy, Requirement } = require("../models");
const { Op } = require("sequelize");
const sequelize = require("../../database/db");

class VacancyRepository {
  async getAll(keyword = '') {
    const whereClause = keyword ? {
      [Op.or]: [
        { title: { [Op.iLike]: `%${keyword}%` } },
        { description: { [Op.iLike]: `%${keyword}%` } }
      ]
    } : {};

    return await Vacancy.findAll({
      where: whereClause,
      order: [['id', 'DESC']]
    });
  }

  async getById(id) {
    const vacancy = await Vacancy.findByPk(id, {
      include: [{ model: Requirement }]
    });

    if (vacancy) {
      const plainVacancy = vacancy.get({ plain: true });
      
      plainVacancy.requirements = plainVacancy.Requirements 
        ? plainVacancy.Requirements.map(req => req.text) 
        : [];
        
      return plainVacancy;
    }
    return null;
  }

  async create(vacancyData, requirementsArray) {
    const transaction = await sequelize.transaction();
    try {
      const vacancy = await Vacancy.create({
        title: vacancyData.title,
        company: vacancyData.company || 'Не вказано',
        salary: vacancyData.salary || '',
        description: vacancyData.description || ''
      }, { transaction });

      if (requirementsArray && requirementsArray.length > 0) {
        const reqRecords = requirementsArray.map(req => ({
          vacancyId: vacancy.id,
          text: req
        }));
        await Requirement.bulkCreate(reqRecords, { transaction });
      }

      await transaction.commit();
      return vacancy.id;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async update(id, vacancyData, requirementsArray) {
    const transaction = await sequelize.transaction();
    try {
      await Vacancy.update({
        title: vacancyData.title,
        company: vacancyData.company || 'Не вказано',
        salary: vacancyData.salary || '',
        description: vacancyData.description || ''
      }, {
        where: { id },
        transaction
      });

      await Requirement.destroy({ where: { vacancyId: id }, transaction });

      if (requirementsArray && requirementsArray.length > 0) {
        const reqRecords = requirementsArray.map(req => ({
          vacancyId: id,
          text: req
        }));
        await Requirement.bulkCreate(reqRecords, { transaction });
      }

      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

    async delete(id) {
    const transaction = await sequelize.transaction();
    try {
      await Vacancy.destroy({ 
        where: { id },
        transaction 
      });
      await transaction.commit();
      return true;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  async findAllWithFilters(limit, offset, filterTitle) {
    const queryOptions = {
      limit: limit,
      offset: offset,
    };

    if (filterTitle) {
      queryOptions.where = {
        title: {
          [Op.iLike]: `%${filterTitle}%` 
        }
      };
    }

    return await Vacancy.findAndCountAll(queryOptions);
  }
}

module.exports = new VacancyRepository();