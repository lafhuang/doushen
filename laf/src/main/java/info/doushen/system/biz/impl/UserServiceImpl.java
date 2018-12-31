package info.doushen.system.biz.impl;

import info.doushen.common.utils.MD5Utils;
import info.doushen.common.utils.PageUtils;
import info.doushen.common.utils.Query;
import info.doushen.system.biz.DeptService;
import info.doushen.system.biz.UserRoleService;
import info.doushen.system.biz.UserService;
import info.doushen.system.entity.UserEntity;
import info.doushen.system.mapper.UserMapper;
import info.doushen.system.vo.UserVO;
import org.dozer.DozerBeanMapper;
import org.dozer.Mapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Objects;

/**
 * UserServiceImpl
 *
 * @author huangdou
 * @date 2018/12/4
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;
    @Autowired
    private DeptService deptService;
    @Autowired
    private UserRoleService userRoleService;

    @Override
    public UserEntity getUserByUserName(String userName) {
        return userMapper.getUserByUserName(userName);
    }

    @Override
    public PageUtils pageUserList(Query query) {
        int count = userMapper.count(query);
        if (count == 0) {
            return new PageUtils(count, new ArrayList<UserEntity>());
        }
        List<UserEntity> userList = userMapper.list(query);
        return new PageUtils(count, userList);
    }

    @Override
    public UserVO get(int id) {
        UserEntity userEntity = userMapper.get(id);
        if (userEntity == null) {
            return null;
        }
        Mapper dozerMapper = new DozerBeanMapper();
        UserVO user = dozerMapper.map(userEntity, UserVO.class);
        user.setDeptName(deptService.get(user.getDeptId()).getDeptName());

        List<Integer> roleIdList = userRoleService.listRoleId(id);
        user.setRoleIdList(roleIdList);
        return user;
    }

    @Override
    @Transactional
    public int update(UserVO user) {
        Mapper mapper = new DozerBeanMapper();
        int result = userMapper.update(mapper.map(user, UserEntity.class));
        userRoleService.batchUpdate(user);
        return result;
    }

    @Override
    @Transactional
    public int save(UserVO user) {
        Mapper mapper = new DozerBeanMapper();
        userMapper.save(mapper.map(user, UserEntity.class));
        return user.getId();
    }

    @Override
    public boolean exist(Map<String, Object> params) {
        Query query = new Query(params);
        int count = userMapper.count(query);
        return count > 0;
    }

    @Override
    @Transactional
    public int remove(int id) {
        UserVO user = new UserVO();
        user.setId(id);
        userRoleService.batchUpdate(user);
        return userMapper.remove(id);
    }

    @Override
    @Transactional
    public int batchremove(int[] userIds) {
        for (int userId : userIds) {
            remove(userId);
        }
        return userIds.length;
    }

    @Override
    @Transactional
    public int resetPwd(UserVO userVO, UserEntity user) throws Exception {
        if (Objects.equals(userVO.getId(), user.getId())) {
            if (Objects.equals(MD5Utils.encrypt(user.getUserName(), userVO.getPwdOld()), user.getPassword())) {
                user = userMapper.get(user.getId());
                user.setPassword(userVO.getPassword());
                return userMapper.update(user);
            } else {
                throw new Exception("输入的旧密码有误！");
            }
        } else {
            throw new Exception("你修改的不是你登录的账号！");
        }
    }

    @Override
    @Transactional
    public int adminResetPwd(UserVO userVO) {
        UserEntity user = userMapper.get(userVO.getId());
        user.setPassword(MD5Utils.encrypt(user.getUserName(), userVO.getPassword()));
        return userMapper.update(user);
    }

}
