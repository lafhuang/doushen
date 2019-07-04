package info.doushen.system.biz;

import info.doushen.system.entity.DeptEntity;
import info.doushen.system.utils.Tree;
import info.doushen.system.vo.DeptVO;

import java.util.List;
import java.util.Map;

/**
 * DeptService
 *
 * @author huangdou
 * @date 2018/12/5
 */
public interface DeptService {

    /**
     * 获取部门列表
     *
     * @param params
     * @return
     */
    List<DeptEntity> list(Map<String, Object> params);

    /**
     * 获取部门树结构
     *
     * @return
     */
    List<Tree<DeptEntity>> getDeptTree();

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
     * 更新部门信息
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
    int remove(int id);

    /**
     * 获取部门信息
     *
     * @param id
     * @return
     */
    DeptVO getDeptInfo(int id);

}
