package info.doushen.system.mapper;

import info.doushen.system.entity.DeptEntity;

import java.util.List;
import java.util.Map;

/**
 * DeptMapper
 *
 * @author huangdou
 * @date 2018/12/5
 */
public interface DeptMapper {

    /**
     * 获取部门列表
     *
     * @param params
     * @return
     */
    List<DeptEntity> list(Map<String, Object> params);

    /**
     * 获取部门信息
     *
     * @param id
     * @return
     */
    DeptEntity get(int id);

    /**
     * 保存部门
     * 
     * @param dept
     * @return
     */
    int save(DeptEntity dept);

    /**
     * 更新部门
     *
     * @param dept
     * @return
     */
    int update(DeptEntity dept);

    /**
     * 删除部门及其子部门
     *
     * @param id
     * @return
     */
    int delete(int id);

    /**
     * 获取部门信息
     *
     * @param id
     * @return
     */
    Map<String, Object> getDeptInfo(int id);

}
