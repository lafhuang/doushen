package info.doushen.system.biz;

import com.github.pagehelper.PageInfo;
import info.doushen.common.utils.Pager;
import info.doushen.common.utils.Query;
import info.doushen.system.entity.RoleEntity;
import info.doushen.system.vo.RoleVO;

import java.util.List;
import java.util.Map;

/**
 * RoleService
 *
 * @author huangdou
 * @date 2018/12/6
 */
public interface RoleService {

    /**
     * 分页查询角色
     *
     * @param query
     * @return
     */
    PageInfo<RoleEntity> pageRoleList(Query query);

    /**
     * 获取角色列表
     *
     * @param query
     * @return
     */
    List<RoleEntity> list(Query query);

    /**
     * 获取角色
     *
     * @param id
     * @return
     */
    RoleEntity get(Integer id);

    /**
     * 保存角色信息
     *
     * @param role
     * @return
     */
    int update(RoleVO role);

    /**
     * 获取用户角色列表
     *
     * @param userId
     * @return
     */
    List<RoleEntity> list(int userId);

    /**
     * 保存角色信息
     *
     * @param role
     * @return
     */
    int save(RoleVO role);

    /**
     * 删除角色
     *
     * @param id
     * @return
     */
    int remove(int id);

    /**
     * 批量删除角色
     *
     * @param roleIdList
     * @return
     */
    int batchremove(int[] roleIdList);

}
